import { useEffect, useState } from "react";
import { getServices } from "@/services/getServices";

export const DentalServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const fetchedServices = await getServices();
      if (fetchedServices) {
        setServices(fetchedServices);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="title text-center p-9 ">Our Dental Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services && services.length > 0 ? (
          services.map((service) => (
            <div key={service.id} className="bg-white shadow-md rounded-lg p-4">
              <img
                src={service.image_url}  // Use the image_url directly
                alt={service.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))
        ) : (
          <p>No services available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default DentalServices;
