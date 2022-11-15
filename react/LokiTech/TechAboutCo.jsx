import React from "react";
import { Formik, Field, Form } from "formik";
import FormLogger from "../../Formik/FormLogger";
// import * as Yup from "yup";

function TechAboutCo(props) {
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
              <label className="fw-bold" htmlFor="inputProfile">
                Profile
              </label>
              <Field
                component="textarea"
                rows="5"
                className="form-control techFormInput my-3"
                name="profile"
                id="inputDescription"
                placeholder="Microsoft Corporation is a technology company. The Company develops and supports software, services, devices, and solutions. Its segments include Productivity and Business Processes, Intelligent Cloud, and More Personal Computing."
              />
              <label className="fw-bold" htmlFor="inputSummary">
                Summary
              </label>
              <Field
                component="textarea"
                rows="5"
                className="form-control techFormInput my-3"
                name="summary"
                id="inputSummary"
                placeholder="Google is a corporation that was formed to provide internet-based search services, providing accessibility to the world's online information. Founded in 1998, Google expanded from their initial search-based services into providing advertising, applications and services for mobile internet devices."
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

export default TechAboutCo;
