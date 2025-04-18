import { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import { getCategoriesByTechnologyId, getResources, getTechnologies, getTopicById, getTopicsByCategoryId, pushJsonIntoResourcesCollection, updateResourceById, updateTopicContent, updateTopicContentById } from "../../services/resourceService";
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
  const [technologyID, setTechnologyID] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [topic, setTopic] = useState("");
  const [contentID, setContentID] = useState("");
  const [contentToSend, setContentToSend] = useState("");
  useEffect(() => {
    const fetchResources = async () => {
      const data = await getTechnologies();
      setResources(data);
    };
    fetchResources();
  }, [isOpen]);

  const onChangeTechnology = async (e) => {
    const value = e.target.value;
    if (value != "") {
      const categories = await getCategoriesByTechnologyId(value);
      setTechnologyTopics(categories);
      setTechnologyID(value);
      setContent("");
    } else {

    }
  }

  const onChangeTechnologyTopic = async (e) => {
    const value = e.target.value;
    setCategoryID(value);
    if (value != "") {
      const topics = await getTopicsByCategoryId(value);
      setSubCategories(topics);
      setContent("");
    } else {
      // Handle the case when "Add New" is selected
    }
  }
  const onChangeTopic = async (e) => {
    const value = e.target.value;
    const content = await getTopicById(value);
    console.log(content)
    if (content.length > 0) {
      setContentID(content[0]?.docId)
      setContentChanged(true);
      setContent(content[0]?.content);
    } else {
      setContentChanged(false);
      setContent("");
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const htmlOutput = editorRef.current.getHTML();
    try {
      await updateTopicContentById(contentID, htmlOutput);
    } catch (error) {
      console.error("❌ Error adding data:", error);
    }

    // notifyModalClose();
    // onClose();
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
                  <option key={idx} value={item.docId}>{item.name}</option>
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
          <div className="p-4  text-gray-500 italic">
            <h3 className="text-xl font-bold text-gray-800">Contentdaefs</h3>
            <Editor ref={editorRef} readOnly={false} />
          </div>
        )}
      </Modal>
    </div>
  )
}
export default DialogComponentForContent;
