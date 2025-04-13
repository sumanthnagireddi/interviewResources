import { useEffect, useState,useRef } from "react";
import Modal from "react-modal";
import { getResources, pushJsonIntoResourcesCollection, updateResourceById } from "../../services/resourceService";
import { contentModalStyles } from "./consts";
import Editor from "../ui/Editor";
import { useModalContext } from "../../context/ModalContext";
import Emptystate from "./Emptystate";

Modal.setAppElement("#root");

const DialogComponentForContent = ({ isOpen, onClose }) => {
  const [resources, setResources] = useState([]);
  const [technologyTopics, setTechnologyTopics] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [content, setContent] = useState("");
  const [contentChanged, setContentChanged] = useState(false);
  const editorRef = useRef();
  const { notifyModalClose } = useModalContext();

  useEffect(() => {
    const fetchResources = async () => {
      const data = await getResources();
      setResources(data);
    };
    fetchResources();
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const htmlOutput = editorRef.current.getHTML();
    console.log("HTML to save:", htmlOutput);

    // const technology = technologyID === "add_new" ? newTechnology : technologyID;
    // const topic = newTechnologyTopic === "add_new_tech_topic" ? newTechnology : newTechnologyTopic;
    // const subcategory = subCategory;
    // const dataToSave = {
    //   technology: technology,
    //   category: topic,
    //   subcategory: subcategory,
    // }
    try {
      // await updateResourceById(dataToSave);  
    } catch (error) {
      console.error("❌ Error adding data:", error);
    }
    
    notifyModalClose();
    onClose();
  }

  const onChangeTechnology = async (e) => {
    const value = e.target.value;
    if (value != "") {
      const selectedResource = resources.find((item) => item.id === value);
      const categories = selectedResource?.categories || [];
      setTechnologyTopics(categories);
      setContent("");
    } else {

    }
  }

  const onChangeTechnologyTopic = (e) => {
    const value = e.target.value;
    if (value != "") {
      const selectedResource = technologyTopics.find((item) => item.name === value);
      const topics = selectedResource?.Topics || [];
      setSubCategories(topics);
      setContent("");
    } else {
      // Handle the case when "Add New" is selected
    }
  }
  const onChangeTopic = (e) => {
    const value = e.target.value;
    const parsedValue = JSON.parse(value)
    if (parsedValue?.content) {
      setContentChanged(true);
      setContent(parsedValue?.content || "");
    } else {
      setContentChanged(false);
      setContent("");
    }
  }
  return (
    <div>
      <Modal isOpen={isOpen} onRequestClose={onClose} style={contentModalStyles} contentLabel="Add Resource Modal">
        <div >
          <form onSubmit={handleSubmit} className=" grid grid-cols-4 items-center  gap-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="technology" className="font-semibold">Technology</label>
              <select onChange={onChangeTechnology} className="mt-1 block w-full border px-3 py-2 rounded border-gray-300 shadow-sm sm:text-sm">
                <option value="">Please select</option>
                {resources?.map((item, idx) => (
                  <option key={idx} value={item.id}>{item.name || item}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="technology" className="font-semibold">Technology Topic</label>
              <select onChange={onChangeTechnologyTopic} className="mt-1 block w-full border px-3 py-2 rounded border-gray-300 shadow-sm sm:text-sm">
                <option value="">Please select</option>
                {technologyTopics?.map((item, idx) => (
                  <option key={idx} value={item.id}>{item.name || item}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="technology" className="font-semibold">Technology Sub Topic</label>
              <select onChange={onChangeTopic} className="mt-1 block w-full border px-3 py-2 rounded border-gray-300 shadow-sm sm:text-sm">
                <option value="">Please select</option>
                {subCategories?.map((item, idx) => (
                  <option key={idx} value={JSON.stringify(item)}>{item.name || item}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="bg-blue-500 mt-7 text-white p-2 rounded">Submit</button>
          </form>
        </div>
        {contentChanged ? (
  <div className="p-4">
    <Editor ref={editorRef} readOnly={false} htmlData={content} />
  </div>
) : (
  <div className="p-4 mt-[10%] text-gray-500 italic">
  <Emptystate/>
  </div>
)}
      </Modal>
    </div>
  )
}
export default DialogComponentForContent;
