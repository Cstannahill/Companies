import React from "react";
import { Formik, Field, Form } from "formik";
import FormLogger from "../../Formik/FormLogger";

// import * as Yup from "yup";

function TechImages(props) {
  const { techCo } = props;
  const { onFileChange } = props;
  const {
    // Formik HOC props
    values,
    // touched,
    // errors,
    isSubmitting,
    // handleChange,
    // handleBlur,
    // handleSubmit,

    // Loki props
    backLabel,
    nextLabel,
    onBack,
    onNext,
    cantBack,
    // isInFinalStep,
  } = props;
  console.log(values);

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={techCo}
        onSubmit={onNext}
      >
        <Form>
          <FormLogger />
          <div className="d-flex wrapper justify-content-center text-dark my-6">
            <div className="form-group col-6 my-3 px-4 py-3 card techFormCard">
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
                If you choose to upload a file, that will be set as your image.
                You do not need to provide both a URL and file.
              </small>
              <input
                id="file"
                name="file"
                type="file"
                className="form-control-file fileInput"
                onChange={onFileChange}
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

              <div className="button-group text-center">
                <button
                  type="button"
                  className="btn btn-lg btn-secondary mx-2"
                  onClick={onBack}
                  disabled={isSubmitting || cantBack}
                >
                  {backLabel}
                </button>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary mx-2"
                  disabled={isSubmitting}
                >
                  {nextLabel}
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default TechImages;
