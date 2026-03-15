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

    async getUserLeads(userId: string) {
        console.log("Supabase call: getUserLeads for", userId);
        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

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
        return data;
    }
};
