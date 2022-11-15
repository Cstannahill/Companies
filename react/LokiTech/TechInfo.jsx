import React from "react";
import { Formik, Field, Form } from "formik";
import FormLogger from "../../Formik/FormLogger";
// import * as Yup from "yup";

function TechInfo(props) {
  const { techCo } = props;
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
              <label className="fw-bold" htmlFor="inputName">
                Company Name
              </label>
              <Field
                type="text"
                className="form-control techFormInput rounded-3 my-3"
                name="name"
                id="inputName"
                placeholder="Google"
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

export default TechInfo;
