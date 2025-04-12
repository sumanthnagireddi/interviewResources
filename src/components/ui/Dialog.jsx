import { useEffect, useState } from "react";
import Modal from "react-modal";
import { getResources, pushJsonIntoResourcesCollection, updateResourceById } from "../../services/resourceService";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    width: "50%",
    height: "56%",
    maxHeight: "80vh",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

Modal.setAppElement("#root");

const DialogComponent = ({ isOpen, onClose }) => {
  const [resources, setResources] = useState([]);
  const [formData, setFormData] = useState({
    technologyID: "",
    technology: "",
    input2: "",
    input3: "",
    newTech: "",
    newTopic: "",
  });

  const [isAddingNewTech, setIsAddingNewTech] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "technology") {
      if (value === "__add_new__") {
        setIsAddingNewTech(true);
        setFormData((prev) => ({
          ...prev,
          technology: "",
          input2: "",
          newTech: "",
          newTopic: "",
        }));
      } else {
        setIsAddingNewTech(false);
        const selectedResource = resources.find((res) => res.name === value);
        const categories = selectedResource?.categories?.[0] || "";
        setFormData((prev) => ({
          ...prev,
          technology: value,
          input2: categories,
          newTech: "",
          newTopic: "",
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const technology = isAddingNewTech ? formData.newTech : formData.technology;
    const topic = isAddingNewTech ? formData.newTopic : formData.input2;

    const dataToSave = {
      technology: technology,
      category: topic,
      subcategory: formData.input3,
      createdAt: new Date().toISOString(),
    };
    
    try {
      await updateResourceById(dataToSave);
      console.log("✅ Data added to Firebase:", dataToSave);
      onClose();
    } catch (error) {
      console.error("❌ Error adding data:", error);
    }
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getResources();
        setResources(data);
        console.log("📦 Fetched resources:", data);
      } catch (error) {
        console.error("❌ Error fetching resources:", error);
      }
    };

    if (isOpen) {
      fetchResources();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Add Resource Modal"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Add Data</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Technology Input if 'Add new' is selected */}
          {isAddingNewTech && (
            <div>
              <label className="block text-sm font-medium text-gray-700">New Technology</label>
              <input
                type="text"
                name="newTech"
                value={formData.newTech}
                onChange={handleInputChange}
                placeholder="Enter new technology"
                className="mt-1 block w-full border px-3 py-2 rounded border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
          )}

          {/* Technology Dropdown */}
          <InputField
            id={formData}
            label="Technology"
            name="technology"
            value={formData.technology}
            data={[...resources, { name: "Add new", id: "__add_new__" }]}
            onChange={handleInputChange}
          />

          {/* Topic Input or Select based on isAddingNewTech */}
          {isAddingNewTech ? (
            <div>
              <label className="block text-sm font-medium text-gray-700">New Topic</label>
              <input
                type="text"
                name="newTopic"
                value={formData.newTopic}
                onChange={handleInputChange}
                placeholder="Enter new topic"
                className="mt-1 block w-full border px-3 py-2 rounded border-gray-300 shadow-sm sm:text-sm"
              />
            </div>
          ) : (
            <InputField
              id="input2"
              label="Topic"
              name="input2"
              value={formData.input2}
              data={
                formData.technology
                  ? resources.find((res) => res.name === formData.technology)?.categories || []
                  : []
              }
              onChange={handleInputChange}
            />
          )}

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <input
              type="text"
              name="input3"
              value={formData.input3}
              onChange={handleInputChange}
              placeholder="Enter notes"
              className="mt-1 block w-full border px-3 py-2 rounded border-gray-300 shadow-sm sm:text-sm"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

const InputField = ({ id, label, value, name, onChange, data }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full border px-3 py-2 rounded border-gray-300 shadow-sm sm:text-sm"
    >
      <option value="">Please select</option>
      {data?.map((item, idx) => (
        <option key={idx} value={item.name || item.id || item}>
          {item.name || item}
        </option>
      ))}
    </select>
  </div>
);

export default DialogComponent;
