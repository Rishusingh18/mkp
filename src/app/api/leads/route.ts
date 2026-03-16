import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// In-memory rate limiting map
// Format: { 'ip-address': { count: number, timestamp: number } }
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(req: Request) {
    try {
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
        const now = Date.now();
        const windowMs = 60 * 1000; // 1 minute
        const maxRequests = 3; // Max 3 requests per minute per IP

        const rateData = rateLimitMap.get(ip) || { count: 0, timestamp: now };
        
        if (now - rateData.timestamp > windowMs) {
            rateData.count = 1;
            rateData.timestamp = now;
        } else {
            rateData.count++;
        }
        
        rateLimitMap.set(ip, rateData);

        if (rateData.count > maxRequests) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        const body = await req.json();
        const { user_id, pickup_city, destination_city, moving_date, shift_type, items, total_estimate, status, customer_name, customer_phone, honeypot } = body;

        // Bot Trap: If the honeypot field is filled, silently ignore it and pretend it succeeded
        if (honeypot) {
            return NextResponse.json({ success: true, lead: { id: 'bot-trap-id', status: 'processing' } });
        }

        if (!pickup_city || !destination_city || !moving_date) {
            return NextResponse.json(
                { error: 'Missing required configuration fields' },
                { status: 400 }
            );
        }

        const payload = {
            user_id: user_id || null,
            pickup_city,
            destination_city,
            moving_date,
            shift_type,
            items: items || [],
            total_estimate: total_estimate || 0,
            status: status || 'submitted',
            customer_name: customer_name || null,
            customer_phone: customer_phone || null
        };

        // Insert into Supabase
        const { data, error } = await supabase
            .from('leads')
            .insert([payload])
            .select()
            .single();

        if (error) {
            console.error("Supabase API Insert Error:", error);
            return NextResponse.json(
                { error: 'Database insertion failed' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true, lead: data });
        
    } catch (error: any) {
        console.error("Leads API Route Error:", error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
