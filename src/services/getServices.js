import { supabase } from "@/lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

// Fetch all services
export const getServices = async () => {
  try {
    const { data, error } = await supabase
      .from("services")
      .select("id, title, description, image_url, user_id")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error retrieving services:", error.message);
    return null;
  }
};

// Upload a new service
export const uploadService = async (imageFile, title, description, userId) => {
  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }

    if (!imageFile) throw new Error("No file selected for upload");

    const filePath = `services/${Date.now()}_${imageFile.name}`;
    console.log("Uploading image to:", filePath);

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("service-images")
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error("Image upload failed:", uploadError);
      throw uploadError;
    }

    console.log("Image uploaded successfully:", uploadData);

    const { data: publicUrlData } = supabase.storage
      .from("service-images")
      .getPublicUrl(filePath);

    const imageUrl = publicUrlData.publicUrl;

    const { data: insertData, error: insertError } = await supabase
      .from("services")
      .insert([{ title, description, image_url: imageUrl, user_id: userId }]);

    if (insertError) {
      console.error("Error inserting service metadata:", insertError);
      throw insertError;
    }

    console.log("Service uploaded successfully:", insertData);
    return insertData;
  } catch (error) {
    console.error("Error uploading service:", error.message);
    return null;
  }
};

// Update an existing service
export const updateService = async (id, updatedData, userId) => {
  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data: service, error: fetchError } = await supabase
      .from("services")
      .select("user_id")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching service:", fetchError);
      throw fetchError;
    }

    // Ensure the user is the owner of the service
    if (service.user_id !== userId) {
      throw new Error("You are not authorized to update this service");
    }

    const { data, error } = await supabase
      .from("services")
      .update(updatedData)
      .eq("id", id);

    if (error) {
      console.error("Error updating service:", error);
      throw error;
    }
    console.log("Service updated successfully:", data);
    return data;
  } catch (error) {
    console.error("Error updating service:", error.message);
    return null;
  }
};

// Delete a service by ID
export const deleteService = async (id, userId) => {
  try {
    if (!userId) {
      throw new Error("User not authenticated");
    }

    const { data: service, error: fetchError } = await supabase
      .from("services")
      .select("user_id, image_url")
      .eq("id", id)
      .single();

    if (fetchError) {
      console.error("Error fetching service for delete:", fetchError);
      throw fetchError;
    }

    // Ensure the user is the owner of the service
    if (service.user_id !== userId) {
      throw new Error("You are not authorized to delete this service");
    }

    if (!service) return { success: false, message: "Service not found" };

    // Extract and delete the image file from storage
    const imagePath = service.image_url.split("/").pop();
    const { error: deleteImageError } = await supabase.storage
      .from("service-images")
      .remove([`services/${imagePath}`]);

    if (deleteImageError) console.warn("Image deletion failed:", deleteImageError);

    // Proceed with service deletion
    const { data: deleteData, error: deleteError } = await supabase
      .from("services")
      .delete()
      .eq("id", id);

    if (deleteError) {
      console.error("Error deleting service:", deleteError);
      throw deleteError;
    }

    console.log("Service deleted successfully:", deleteData);
    return { success: true, message: "Service deleted successfully" };
  } catch (error) {
    console.error("Error deleting service:", error.message);
    return { success: false, message: error.message };
  }
};

export default {
  getServices,
  uploadService,
  updateService,
  deleteService,
};
