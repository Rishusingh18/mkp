import { supabase } from "@/lib/supabase";

export interface LeadData {
    id?: string;
    user_id?: string;
    pickup_city: string;
    destination_city: string;
    moving_date: string;
    shift_type: "local" | "intercity";
    items?: any[];
    total_estimate?: number;
    status?: string;
    customer_name?: string;
    customer_phone?: string;
}

export interface ProfileData {
    id: string;
    full_name?: string;
    phone?: string;
    address?: string;
    avatar_url?: string;
}

export const leadService = {
    async createLead(lead: LeadData) {
        console.log("Supabase call: createLead", lead);
        const { data, error } = await supabase
            .from('leads')
            .insert([lead])
            .select()
            .single();

        if (error) {
            console.error("Supabase error in createLead:", error);
            throw error;
        }
        return data;
    },

    async updateLead(id: string, updates: Partial<LeadData>) {
        console.log(`Supabase call: updateLead for ID: ${id}`, updates);
        const { data, error } = await supabase
            .from('leads')
            .update(updates)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            console.error("Supabase error in updateLead:", error);
            throw error;
        }
        return data;
    },

    async getUserLeads(userId: string, userPhone?: string, userName?: string) {
        console.log("Supabase call: getUserLeads for", userId, userPhone, userName);
        
        let query = supabase.from('leads').select('*');
        
        if (userPhone) {
            // Clean phone number (remove spaces, dashes)
            const cleanPhone = userPhone.replace(/[\s-]/g, '');
            // Create variants: with +91, with 91, and just the raw 10 digits
            let basePhone = cleanPhone;
            if (cleanPhone.startsWith('+91')) basePhone = cleanPhone.substring(3);
            else if (cleanPhone.startsWith('91') && cleanPhone.length === 12) basePhone = cleanPhone.substring(2);
            
            const variant1 = basePhone; // e.g., 9310138154
            const variant2 = `+91${basePhone}`; // e.g., +919310138154
            const variant3 = `91${basePhone}`; // e.g., 919310138154

            // Include leads matching the user_id OR any of the phone variants
            query = query.or(`user_id.eq.${userId},customer_phone.eq.${variant1},customer_phone.eq.${variant2},customer_phone.eq.${variant3}${userName ? `,customer_name.eq."${userName}"` : ''}`);
        } else if (userName) {
            query = query.or(`user_id.eq.${userId},customer_name.eq."${userName}"`);
        } else {
            query = query.eq('user_id', userId);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
            console.error("Supabase error in getUserLeads:", error);
            throw error;
        }
        return data;
    },

    async getLeadById(id: string) {
        console.log("Supabase call: getLeadById", id);
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error("Supabase error in getLeadById:", error);
            throw error;
        }
        return data;
    },

    async getAllLeads() {
        console.log("Supabase call: getAllLeads");
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Supabase error in getAllLeads:", error);
            throw error;
        }
        return data as LeadData[];
    },

    async getProfile(userId: string) {
        console.log("Supabase call: getProfile", userId);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
            console.error("Supabase error in getProfile:", error);
            throw error;
        }
        return data as ProfileData | null;
    },

    async updateProfile(userId: string, updates: Partial<ProfileData>) {
        console.log("Supabase call: updateProfile", userId, updates);
        const { data, error } = await supabase
            .from('profiles')
            .upsert({ id: userId, ...updates, updated_at: new Date().toISOString() })
            .select()
            .single();

        if (error) {
            console.error("Supabase error in updateProfile:", error);
            throw error;
        }

        // Inform auth metadata if applicable
        const authUpdates: any = {};
        if (updates.full_name) authUpdates.full_name = updates.full_name;
        if (updates.phone) authUpdates.phone = updates.phone;
        
        if (Object.keys(authUpdates).length > 0) {
            await supabase.auth.updateUser({
                data: authUpdates
            });
        }

        return data as ProfileData;
    }
};
