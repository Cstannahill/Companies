import React, { useState, useEffect } from "react";
import techService from "../../services/techService";
import { addFile } from "../../services/fileService";
import toastr from "toastr";
import { useLocation } from "react-router-dom";
import TechInfo from "./LokiTech/TechInfo";
import TechImages from "./LokiTech/TechImages";
import TechAboutCo from "./LokiTech/TechAboutCo";
import "./loki.css";
import {
  faClipboard,
  faImage,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loki from "react-loki";

function LokiTech() {
  const [techFormData, setTechFormData] = useState({
    name: "",
    profile: "",
    summary: "",
    headline: "",
    contactInformation: "",
    statusId: "",
    slug: "",
    primaryImage: { typeId: "", url: "" },
    id: "",
  });
  const [file, setFile] = useState();

  const location = useLocation();
  const { state } = useLocation();
  console.log(location);
  useEffect(() => {
    if (state?.type === "edit_TechCo" && state?.payload) {
      setTechFormData((prevState) => {
        let newFormData = { ...prevState };
        newFormData = state.payload;
        console.log("stateChanged");
        return newFormData;
      });
    }
  }, []);

  const onSubmitTechCoData = (values) => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const onAddFileSuccess = (response) => {
        console.log("Successful upload: ", response);
        const imgAr = response[0];
        values.primaryImage.url = imgAr;
        setTechFormData((prevState) => {
          const newData = { ...prevState };
          newData.primaryImage.url = imgAr;
          return newData;
        });
        if (techFormData.id !== "") {
          techService
            .updateTechCompany(values.id, values)(values.id, values)
            .then(onUpdateTechCoSuccess)
            .catch(onUpdateTechCoError);
        } else {
          techService
            .addTechCompany(values)
            .then(onAddTechCoSuccess)
            .catch(onAddTechCoError);
        }
      };

      addFile(formData).then(onAddFileSuccess).catch(onAddFileError);
    } else if (techFormData.id !== "") {
      techService
        .updateTechCompany(values.id, values)
        .then(onUpdateTechCoSuccess)
        .catch(onUpdateTechCoError);
    } else {
      techService
        .addTechCompany(values)
        .then(onAddTechCoSuccess)
        .catch(onAddTechCoError);
    }
  };

  const onFileUploadChange = (e) => {
    const targetFiles = e.target.files[0];
    setFile((prevState) => {
      let newFile = { ...prevState };
      newFile = targetFiles;
      return newFile;
    });
  };
  false && console.log(setFile, onSubmitTechCoData);

  const onAddTechCoSuccess = (response) => {
    console.log("Add success", response);
    toastr.success("Company has been successfully added.");
    setTechFormData((prevState) => {
      const newTechCoData = {
        ...prevState,
      };
      newTechCoData.id = response.id;
      console.log(newTechCoData);
      return newTechCoData;
    });
  };

  const onAddTechCoError = (error) => {
    console.warn("Add Error", error);
    toastr.error("There was an error adding your company.");
  };

  const onAddFileError = (err) => {
    console.log(err, "error uploading file");
  };

  const onUpdateTechCoSuccess = (response) => {
    console.log("Update Success:", response);
    toastr.success("Company has been successfully updated.");
    setTechFormData((prevState) => {
      console.log("updater onChange");
      let newTechCoData = {
        ...prevState,
      };
      newTechCoData = response;
      console.log(newTechCoData);
      return newTechCoData;
    });
  };

  const onUpdateTechCoError = (error) => {
    console.warn("Update Error", error);
    toastr.error("There was an error updating your company.");
  };

  const complexSteps = [
    {
      label: "Step 1",
      icon: <FontAwesomeIcon icon={faClipboard} className="mt-3 lokiCenter" />,
      component: <TechInfo techCo={techFormData} />,
    },
    {
      label: "Step 2",
      icon: <FontAwesomeIcon icon={faInfoCircle} className="mt-3 lokiCenter" />,
      component: <TechAboutCo techCo={techFormData} />,
    },
    {
      label: "Step 3",
      icon: <FontAwesomeIcon icon={faImage} className="mt-3 lokiCenter" />,
      component: (
        <TechImages techCo={techFormData} onFileChange={onFileUploadChange} />
      ),
    },
  ];

  const _mergeValues = (values) => {
    setTechFormData((prevState) => {
      const newState = { ...prevState, ...values };
      return newState;
    });
  };

  const _finishWizard = (values) => {
    setTechFormData((prevState) => {
      const newState = { ...prevState, ...values };
      console.log(newState);
      onSubmitTechCoData(values);
      return newState;
    });
  };

  return (
    <>
      <div className="container col-6">
        <Loki
          steps={complexSteps}
          onNext={_mergeValues.bind()}
          onBack={_mergeValues.bind()}
          onFinish={_finishWizard.bind()}
          noActions
        />
      </div>
    </>
  );
}

export default LokiTech;
