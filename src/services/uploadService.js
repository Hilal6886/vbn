import { supabase } from "@/lib/supabaseClient"; 
export const uploadService = async (imageFile, title, description) => {
    try {
      // Step 1: Upload Image to Supabase Storage
      const filePath = `services/${Date.now()}_${imageFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("service-images")
        .upload(filePath, imageFile);
  
      if (uploadError) {
        console.error('Upload Error:', uploadError);  // Log the error for debugging
        throw uploadError;
      }
  
      // Get the public URL of the uploaded image
      const { data: publicUrlData } = supabase.storage
        .from("service-images")
        .getPublicUrl(filePath);
  
      const imageUrl = publicUrlData.publicUrl;
  
      // Step 2: Insert Metadata into the Database Table
      const { data: insertData, error: insertError } = await supabase
        .from("services")
        .insert([
          {
            title: title,
            description: description,
            image_url: imageUrl,
          },
        ]);
  
      if (insertError) {
        console.error('Insert Error:', insertError);  // Log the error for debugging
        throw insertError;
      }
  
      console.log("Service uploaded successfully:", insertData);
      return insertData;
    } catch (error) {
      console.error("Error uploading service:", error.message);
      return null;
    }
  };
  

export default uploadService;
