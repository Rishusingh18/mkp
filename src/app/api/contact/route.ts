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
            // Reset the window if 1 minute has passed
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
        const { name, phone, query, honeypot } = body;

        // Bot Trap: If the honeypot field is filled, silently ignore it and pretend it succeeded
        if (honeypot) {
            return NextResponse.json({ success: true });
        }

        if (!name || !phone || !query) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Insert into Supabase
        const { error } = await supabase
            .from('contact_queries')
            .insert([{ name, phone, query }]);

        if (error) {
            console.error("Supabase API Insert Error:", error);
            return NextResponse.json(
                { error: 'Database insertion failed' },
                { status: 500 }
            );
        }

        return NextResponse.json({ success: true });
        
    } catch (error: any) {
        console.error("Contact API Route Error:", error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
