import { useEffect, useState } from "react";
import Modal from "react-modal";
import { addNewTechnology, getCategoriesByTechnologyId, getResources, getTechnologies, pushJsonIntoResourcesCollection, updateResourceById } from "../../services/resourceService";
import { customStyles } from "./consts";
import { useModalContext } from "../../context/ModalContext";

Modal.setAppElement("#root");

const DialogComponent1 = ({ isOpen, onClose }) => {
  const [technologies, setTechnologies] = useState([]);
  const [technologyID, setTechnologyID] = useState("");
  const [technologyTopics, setTechnologyTopics] = useState([]);
  const [newTechnology, setNewTechnology] = useState("");
  const [newCategory, setNewCategory] = useState("")
  const [newTechnologyTopic, setNewTechnologyTopic] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const { notifyModalClose } = useModalContext();
  const [createButtonStatus, setCreateButtonstatus] = useState("technology");
  useEffect(() => {
    const fetchResources = async () => {
      const data = await getTechnologies();
      setTechnologies(data);
      // await addNewTechnology({name:"Sumanth"})
    };
    fetchResources();

  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const technology = technologyID === "add_new" ? newTechnology : technologyID;
    const topic = newTechnologyTopic === "add_new_tech_topic" ? newTechnology : newTechnologyTopic;
    const subcategory = subCategory;
    const dataToSave = {
      technology: technology,
      category: topic,
      subcategory: subcategory,
    }
    try {
      await updateResourceById(dataToSave);
    } catch (error) {
      console.error("❌ Error adding data:", error);
    }
    // notifyModalClose();
    // onClose();
  }

  const onChangeTechnology = async (e) => {
    const value = e.target.value;
    setTechnologyID(value);
    if (value != "add_new") {
      const selectedResource = await getCategoriesByTechnologyId(value);
      setTechnologyTopics(selectedResource);
    } else {

    }
  }

  const onChangeTechnologyTopic = (e) => {
    const value = e.target.value;
    setNewTechnologyTopic(value);
    if (value != "add_new_tech_topic") {
      const selectedResource = technologyTopics.find((item) => item.name === value);
      const topics = selectedResource?.Topics || [];
      // set(topics);
    } else {
      // Handle the case when "Add New" is selected
    }

  }

  const handleAddTechnology = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: newTechnology,
      }
      await addNewTechnology(payload);
    } catch (error) {

    }
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    const payload = {
      name: subCategory,
      parent: technologyID,
    }
  }

  const createButtons = <div className="space-x-3 mb-4">
    <a onClick={() => setCreateButtonstatus('technology')} class="inline-block cursor-pointer rounded-sm border border-emerald-600 bg-emerald-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-emerald-600 focus:ring-3 focus:outline-hidden">Add Technology</a>
    <a onClick={() => setCreateButtonstatus('category')} class="inline-block cursor-pointer rounded-sm border border-emerald-600 bg-emerald-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-emerald-600 focus:ring-3 focus:outline-hidden">Add Category</a>
    <a onClick={() => setCreateButtonstatus('topic')} class="inline-block cursor-pointer rounded-sm border border-emerald-600 bg-emerald-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-emerald-600 focus:ring-3 focus:outline-hidden">Add SubCategory</a>
  </div>;
  
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles} contentLabel="Add Resource Modal">
        <div className="p-6">
          {/* buttons */}
          {createButtons}
          {/* add technology container */}
          {createButtonStatus == 'technology' && (
            <form className="space-y-4" onSubmit={handleAddTechnology}>
              <div className="flex flex-col space-y-2">
                <label htmlFor="technology" className="font-semibold">Add Technology</label>
                <input type="text" id="technology" name="technology" onChange={(e) => setNewTechnology(e.target.value)} className="border p-2 rounded" />
              </div>
              <button type="submit" className="bg-emerald-500 text-white p-2 rounded">Submit</button>
            </form>
          )}

          {/* add topic container */}
          {createButtonStatus == 'category' && (
            <form className="space-y-4" onSubmit={handleAddCategory}>
              <div className="flex flex-col space-y-2">
                <label htmlFor="technology" className="font-semibold">Technology</label>
                <select onChange={onChangeTechnology} className="mt-1 block w-full border px-3 py-2 rounded border-gray-300 shadow-sm sm:text-sm">
                  <option value="">Please select</option>
                  {technologies?.map((item, idx) => (
                    <option key={idx} value={item.id}>{item.name || item}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="technology" className="font-semibold">Add Category</label>
                <input type="text" id="technology" name="technology" onChange={(e) => setSubCategory(e.target.value)} className="border p-2 rounded" />
              </div>
              <button type="submit" className="bg-emerald-500 text-white p-2 rounded">Submit</button>
            </form>
          )}
          {/* add topic container */}
          {createButtonStatus == 'topic' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="technology" className="font-semibold">Technology</label>
                <select onChange={onChangeTechnology} className="mt-1 block w-full border px-3 py-2 rounded border-gray-300 shadow-sm sm:text-sm">
                  <option value="">Please select</option>
                  {technologies?.map((item, idx) => (
                    <option key={idx} value={item.id}>{item.name || item}</option>
                  ))}
                  <option value="add_new">Add New</option>
                </select>
              </div>
              {/* New Technology Input if 'Add new' is selected */}
              {technologyID === "add_new" && (
                <div>
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="newTechnology" className="font-semibold">New Technology</label>
                    <input type="text" id="newTechnology" name="newTechnology" required className="border p-2 rounded" onChange={(e) => setNewTechnology(e.target.value)} />
                  </div>

                </div>
              )}

              {technologyID != "add_new" && (
                <div className="flex flex-col space-y-2">
                  <label htmlFor="category" className="font-semibold">Category</label>
                  <select onChange={onChangeTechnologyTopic} className="mt-1 block w-full border px-3 py-2 rounded border-gray-300 shadow-sm sm:text-sm">
                    <option value="">Please select</option>
                    {technologyTopics?.map((item, idx) => (
                      <option key={idx} value={item.docId}>{item.name || item}</option>
                    ))}
                    <option value="add_new_tech_topic">Add New</option>
                  </select>
                </div>
              )}
              {(newTechnologyTopic === "add_new_tech_topic" || newTechnologyTopic === "add_new") && (
                <div className="flex flex-col space-y-2">
                  <label htmlFor="newTechnology" className="font-semibold">New Technology Topic</label>
                  <input type="text" id="newTechnology" name="newTechnology" className="border p-2 rounded" onChange={(e) => setNewTechnology(e.target.value)} />
                </div>
              )}
              <div className="flex flex-col space-y-2">
                <label htmlFor="subcategory" className="font-semibold">Subcategory</label>
                <input type="text" id="subcategory" name="subcategory" onChange={(e) => setSubCategory(e.target.value)} className="border p-2 rounded" />
              </div>
              <button type="submit" className="bg-emerald-500 text-white p-2 rounded">Submit</button>
            </form>
          )}

        </div>
      </Modal >
    </div >
  )
}
export default DialogComponent1;
