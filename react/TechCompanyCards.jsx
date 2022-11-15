import React from "react";

function TechCompanyCards(props) {
  const techCo = props.techCo;

  const onDeleteClicked = () => {
    props.onDeleteRequested(techCo);
  };
  const whenEditClicked = () => {
    props.onEdit(techCo);
  };
  const onViewMoreClicked = () => {
    props.toggleModal(techCo);
  };
  return (
    <div className="card techCoCard col-lg-3 col-md-6 col-sm-12 border border-secondary border-2 m-4">
      <img
        className="techCoCard card-img-top"
        src={techCo?.primaryImage.url}
        alt="alt"
        height={200}
      />
      <div className="d-flex flex-column justify-content-center card-body">
        <h5 className="card-title text-center fw-bold">{techCo.name}</h5>
        <p className="card-text text-center fw-bold ">{techCo.headline}</p>
        <button
          className="techCoCard viewMore btn-sm btn-dark my-4"
          onClick={onViewMoreClicked}
        >
          View More
        </button>
        <button
          className="techCoCard btn-sm btn-primary my-1"
          onClick={whenEditClicked}
        >
          Edit
        </button>
        <button
          className="techCoCard btn-sm btn-danger "
          onClick={onDeleteClicked}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TechCompanyCards;
