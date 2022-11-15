import React, { useState, useEffect } from "react";
import techService from "../../services/techService";
import { addFile } from "../../services/fileService";
import toastr from "toastr";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import FormLogger from "../Formik/FormLogger";

function TechCoForm() {
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

  return (
    <React.Fragment>
      <main role="main" className="techCo">
        <div className="container">
          <h1 className="display-5 fw-bold text-center my-3">
            Company Information
          </h1>
          <Formik
            enableReinitialize={true}
            initialValues={techFormData}
            onSubmit={onSubmitTechCoData}
          >
            <Form>
              <FormLogger />
              <div className="d-flex wrapper justify-content-center text-dark my-6">
                <div className="form-group col-6 my-3 px-4 py-3 card techFormCard">
                  <label className="fw-bold" htmlFor="inputName">
                    Company Name
                  </label>
                  <Field
                    type="text"
                    className="form-control techFormInput my-3"
                    name="name"
                    id="inputName"
                    placeholder="Google"
                  />
                  <label className="fw-bold" htmlFor="inputProfile">
                    Profile
                  </label>
                  <Field
                    type="text"
                    className="form-control techFormInput my-3"
                    name="profile"
                    id="inputDescription"
                    placeholder="Google's mission is to organize the world's information etc."
                  />
                  <label className="fw-bold" htmlFor="inputSummary">
                    Summary
                  </label>
                  <Field
                    type="text"
                    className="form-control techFormInput my-3"
                    name="summary"
                    id="inputSummary"
                    placeholder="Google is a corporation that was formed to provide internet-based search services etc."
                  />
                  <label className="fw-bold" htmlFor="inputHeadline">
                    Location
                  </label>
                  <Field
                    type="text"
                    className="form-control techFormInput my-3"
                    name="headline"
                    id="inputHeadline"
                    placeholder="Mountain View, CA"
                  />
                  <label className="fw-bold" htmlFor="inputSlug">
                    Slug
                  </label>
                  <Field
                    type="text"
                    className="form-control techFormInput my-3"
                    name="slug"
                    id="inputSlug"
                    placeholder="xyz123992"
                  />
                  <label className="fw-bold" htmlFor="inputStatusId">
                    Status
                  </label>
                  <Field
                    component="select"
                    type="text"
                    className="form-control techFormInput my-3"
                    name="statusId"
                    id="inputStatusId"
                    placeholder="Active, Flagged, Deleted, Not Set"
                    style={{
                      appearance: "menulist",
                    }}
                  >
                    <option value={0} key={`status${0}`}>
                      {"Not Set"}
                    </option>

                    <option value={1} key={`status${1}`}>
                      {"Active"}
                    </option>

                    <option value={2} key={`status${2}`}>
                      {" "}
                      {"Deleted"}
                    </option>

                    <option value={3} key={`status${3}`}>
                      {" "}
                      {"Flagged"}
                    </option>
                  </Field>
                  <label className="fw-bold" htmlFor="contactInformation">
                    Contact Information
                  </label>
                  <Field
                    type="text"
                    className="form-control techFormInput my-3"
                    name="contactInformation"
                    id="contactInformation"
                    placeholder="google.com"
                  />
                  <label className="fw-bold" htmlFor="inputImgUrl">
                    Images
                  </label>
                  <Field
                    type="text"
                    className="form-control techFormInput my-3"
                    name="primaryImage.url"
                    id="inputImgUrl"
                    placeholder="https://image.architonic.com/imgArc/project-1/4/5201637/evolution-design-google-hub-architonic-009-f0-reception-02.jpg"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    If you choose to upload a file, that will be set as your
                    image. You do not need to provide both a URL and file.
                  </small>
                  <input
                    id="file"
                    name="file"
                    type="file"
                    onChange={onFileUploadChange}
                  />
                  <label className="fw-bold" htmlFor="contactInformation">
                    Image Type
                  </label>
                  <div className="form-group">
                    <Field
                      component="select"
                      type="text"
                      className="form-control techFormInput my-3"
                      name="primaryImage.typeId"
                      id="inputStatusId"
                      placeholder="Active, Flagged, Deleted, Not Set"
                      style={{
                        appearance: "menulist",
                      }}
                    >
                      <option value={1} key={`status${1}`}>
                        {"Seo"}
                      </option>

                      <option value={2} key={`status${2}`}>
                        {"Cover"}
                      </option>

                      <option value={3} key={`status${3}`}>
                        {" "}
                        {"Main"}
                      </option>

                      <option value={4} key={`status${4}`}>
                        {" "}
                        {"Other"}
                      </option>

                      <option value={5} key={`status${5}`}>
                        {" "}
                        {"Logo"}
                      </option>
                    </Field>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-dark techCoForm my-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </main>
    </React.Fragment>
  );
}

export default TechCoForm;
