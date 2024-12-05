import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Button, Input, Typography, Progress } from "@material-tailwind/react";
import { TrashIcon, PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import { getServices, uploadService, updateService, deleteService } from '@/services/getServices';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const DashboardTable = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newService, setNewService] = useState({ title: "", description: "", image: null });
  const [preview, setPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [loadingButton, setLoadingButton] = useState(false); // Track button loading state

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    const data = await getServices();
    setServices(data || []);
    setIsLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewService((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    const { title, description, image } = newService;
    if (!title || !description || !image) {
      toast.error("All fields are required!");
      return;
    }

    setLoadingButton(true); // Start loading state for button
    try {
      const response = await uploadService(image, title, description, setUploadProgress);
      if (response.success) {
        toast.success("Service uploaded successfully!");
        fetchServices();
        setNewService({ title: "", description: "", image: null });
        setPreview(null);
        setUploadProgress(0);
        setShowModal(false);
      } else {
        toast.error("Error uploading service");
      }
    } catch (error) {
      toast.error("Error uploading service");
    } finally {
      setLoadingButton(false); // End loading state for button
    }
  };

  const handleUpdate = async () => {
    const { title, description, image } = newService;
    if (!title || !description) {
      toast.error("Title and description are required!");
      return;
    }

    setLoadingButton(true); // Start loading state for button
    try {
      const response = await updateService(currentService.id, title, description, image);
      if (response && response.success) {
        toast.success("Service updated successfully!");
        fetchServices();
        setNewService({ title: "", description: "", image: null });
        setPreview(null);
        setUploadProgress(0);
        setShowModal(false);
      } else {
        toast.error("Error updating service");
      }
    } catch (error) {
      toast.error("Error updating service");
    } finally {
      setLoadingButton(false); // End loading state for button
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteService(id);
    if (response.success) {
      toast.success(response.message);
      fetchServices();
    } else {
      toast.error(response.message);
    }
  };

  const handleEdit = (service) => {
    setCurrentService(service);
    setNewService({ title: service.title, description: service.description, image: null });
    setPreview(service.image_url);
    setShowModal(true);
  };

  const renderModal = () => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96 max-w-lg transform transition-all duration-300 ease-in-out scale-100 hover:scale-105">
          <Typography variant="h5" color="blue-gray" className="text-center text-xl font-semibold mb-6">
            {currentService ? "Edit Service" : "Create Service"}
          </Typography>

          <div className="mb-4">
            <Input
              label="Title"
              value={newService.title}
              onChange={(e) => setNewService((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <Input
              label="Description"
              value={newService.description}
              onChange={(e) => setNewService((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <Input
              type="file"
              onChange={handleImageChange}
              className="w-full py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {preview && (
            <div className="mb-4 flex justify-center">
              <img src={preview} alt="Preview" className="h-24 w-24 object-cover rounded-md" />
            </div>
          )}

          {uploadProgress > 0 && (
            <div className="mb-4">
              <Progress value={uploadProgress} color="green" className="w-full" />
              <Typography variant="small" color="green" className="text-center mt-2">
                Uploading: {uploadProgress}%
              </Typography>
            </div>
          )}

          <div className="flex justify-between">
            <Button
              color="gray"
              onClick={() => setShowModal(false)}
              className="w-24 py-2 text-center rounded-md border-2 border-gray-300 hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              color="green"
              onClick={currentService ? handleUpdate : handleUpload}
              className="w-24 py-2 text-center rounded-md bg-green-500 text-white hover:bg-green-600"
            >
              {loadingButton ? "Uploading..." : currentService ? "Update" : "Upload"}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
      {showModal && renderModal()}

      <Card>
        <CardHeader floated={false} shadow={false} className="flex justify-between items-center p-4">
          <Typography variant="h5" color="blue-gray">Clinic Services</Typography>
          <Button color="black" onClick={() => setShowModal(true)} className="flex items-center gap-2">
            <PlusIcon className="h-5 w-5" /> Create Service
          </Button>
        </CardHeader>
        <CardBody className="overflow-x-auto  p-4">
          {isLoading ? (
            <Typography variant="small" color="blue-gray" className="text-center">Loading...</Typography>
          ) : (
            <table className="min-w-full table-auto text-left border border-gray-400">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600 border">Image</th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600 border">Title</th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600 border">Description</th>
                  <th className="px-4 py-2 text-sm font-medium text-gray-600 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.id} className="border-b border-gray-400">
                    <td className="px-4 py-2">
                      <img src={service.image_url} alt="Service" className="h-12 w-12 object-cover rounded-md" />
                    </td>
                    <td className="px-4 py-2">{service.title}</td>
                    <td className="px-4 py-2">{service.description}</td>
                    <td className="px-4 py-2 flex gap-4">
                      <Button
                        color="yellow"
                        onClick={() => handleEdit(service)}
                        className="rounded-full p-2"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </Button>
                      <Button
                        color="red"
                        onClick={() => handleDelete(service.id)}
                        className="rounded-full p-2"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default DashboardTable;
