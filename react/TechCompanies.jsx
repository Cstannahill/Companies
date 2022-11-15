import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import TechCompanyCards from "./TechCompanyCards";
import techService from "../../services/techService";
import toastr from "toastr";
import SelectPagedItem from "../selectPage/SelectPagesForm";
import SearchBar from "../selectPage/SearchBar";
import "./techview.css";
import TechModal from "../modal/TechModal";
import swal from "@sweetalert/with-react";
import debug from "sabio-debug";

const _logger = debug.extend("TechCompanies");

function TechCompanies() {
  const [companies, setCompanies] = useState({
    arrOfCompanies: [],
    companyComponents: [],
  });
  const [pageInfo, setPageInfo] = useState({
    count: 9,
    pageSize: 6,
    pageIndex: 0,
    current: 1,
  });
  const [show, setShow] = useState({
    isShown: true,
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    show: false,
    name: "",
    profile: "",
    summary: "",
    headline: "",
    contactInfo: "",
    jobs: "",
  });
  const [search, setSearch] = useState({
    query: "",
  });
  const navigate = useNavigate();

  const onSearchChange = (e) => {
    //updater function to update state when search field is typed in with the value
    const target = e.target;
    const newSearchValue = target.value;
    const searchFieldName = target.name;
    setSearch((prevState) => {
      const updatedSearch = { ...prevState };
      updatedSearch[searchFieldName] = newSearchValue;
      return updatedSearch;
    });
  };

  useEffect(() => {
    //useEffect to fire when page load initially get tech techCompanies, and when the current page is changed or the page size is changed.
    techService
      .getTechCompanies(pageInfo.pageIndex, pageInfo.pageSize)
      .then(onGetCompanyPageSuccess)
      .catch(onGetCompanyPageError);
  }, [pageInfo.current, pageInfo.pageSize]);

  const onDeleteRequested = (techCo) => {
    //calling this function via props on the click of delete button from the specific card as it was sent over via onClick handler on card that calls props.onDeleteSuccess(company) to retrieve specific company information
    swal({
      title: "Woah there, buddy!",
      text: "Are you sure you want to delete this company?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        techService
          .deleteTechCo(techCo.id)
          .then(onDeleteSuccess(techCo))
          .catch(onDeleteError);
        // .catch(onDeleteFriendError);
      } else {
        swal("Relax, the company has not been removed.");
      }
    });
  };

  const onDeleteSuccess = (techCo) => {
    //setting/updating state, using the company information passed back to match the Id with the id in the array of tech companies we have in state to splice out and remap components to update DOM
    _logger(techCo);
    setCompanies((prevState) => {
      const techData = { ...prevState };
      techData.arrOfCompanies = [...techData.arrOfCompanies];
      const indx = techData.arrOfCompanies.findIndex((techCompany) => {
        let result = false;
        if (techCompany.id === techCo.id) {
          result = true;
        }
        return result;
      });
      if (indx >= 0) {
        techData.arrOfCompanies.splice(indx, 1);
        techData.companyComponents = techData.arrOfCompanies.map(mapCompanies);
      }
      return techData;
    });
    swal("Friend has been successfully deleted.", {
      icon: "success",
    });
  };

  const onDeleteError = (error) => {
    console.warn("Error deleting company, error: ", error);
  };

  const onSearchClicked = (e) => {
    //searches by query state(what is input into search bar on page) if a search query exists, else does a getPagination to essentially reset the page cards if was searched previously
    e.preventDefault();
    if (search.query) {
      techService
        .getTechCompaniesSearch(
          pageInfo.pageIndex,
          pageInfo.pageSize,
          search.query
        )
        .then(onGetCompanySearchSuccess)
        .catch(onGetCoSearchError);
    } else {
      techService
        .getTechCompanies(pageInfo.pageIndex, pageInfo.pageSize)
        .then(onGetCompanyPageSuccess)
        .catch(onGetCompanyPageError);
    }
  };

  const onEditRequest = useCallback((company) => {
    //formatting company that is received from calling this function via props on the card page of the specific card that was clicked, and navigating with it as state to the edit page
    const companyToSend = {
      id: company.id,
      name: company.name,
      profile: company.profile,
      summary: company.summary,
      headline: company.headline,
      contactInformation: company.contactInformation,
      slug: company.slug,
      statusId: company.statusId,
      primaryImage: {
        typeId: company.primaryImage.typeId,
        url: company.primaryImage.url,
        id: company.primaryImage.id,
      },
    };
    const coToEdit = { type: "edit_TechCo", payload: companyToSend };
    navigate(`${company.id}`, { state: coToEdit });
  }, []);

  const onHideShowClick = () => {
    //setting state to the opposite boolean of what it was previously onClick to conditionally render  the cards
    setShow((prevState) => {
      const isVisible = { ...prevState };
      isVisible.isShown = !prevState.isShown;
      return isVisible;
    });
  };

  const onGetCompanySearchSuccess = (response) => {
    //upon successful api request to searchPaginated, taking the response to set total count for pagination, and the array of companies in the response to set into state and map accordingly to jsx elements
    toastr.success("Companies retrieved!");
    _logger("Get Co. by Search Success: ", response);
    const newCompanies = response.pagedItems;
    setCompanies((prevState) => {
      const companies = { ...prevState };
      companies.arrOfCompanies = newCompanies;
      companies.companyComponents = newCompanies.map(mapCompanies);
      return companies;
    });
    setPageInfo((prevState) => {
      const newPage = { ...prevState };
      newPage.count = response.totalCount;
      return newPage;
    });
  };

  const onGetCoSearchError = (error) => {
    console.warn("Error Searching Co's: ", error);
  };

  const onGetCompanyPageSuccess = (response) => {
    //upon successful api request to pagination, taking the response to set total count for pagination, and the array of companies in the response to set into state and map accordingly to jsx elements
    toastr.success("Companies retrieved!");
    _logger("Get companies success: ", response);
    const newCompanies = response.pagedItems;
    setCompanies((prevState) => {
      const companies = { ...prevState };
      companies.arrOfCompanies = newCompanies;
      companies.companyComponents = newCompanies.map(mapCompanies);
      return companies;
    });
    setPageInfo((prevState) => {
      const newPage = { ...prevState };
      newPage.count = response.totalCount;
      return newPage;
    });
  };
  const onGetCompanyPageError = (error) => {
    toastr.error("There was an error retrieving the companies");
    console.warn("Error getting companies :", error);
  };

  const onPageChange = (page) => {
    //updating the current page and page index when the page on pagination component is changed
    setPageInfo((prevState) => {
      const newPage = { ...prevState };
      newPage.current = page;
      newPage.pageIndex = newPage.current - 1;
      return newPage;
    });
  };

  const onSelectPageSize = (event) => {
    //setting value of the page size via select dropdown menu
    const target = event.target;
    const newVal = target.value;
    setPageInfo((prevState) => {
      const newValue = { ...prevState };
      _logger(newValue);
      newValue.pageSize = Number(newVal);

      return newValue;
    });
  };

  const mapCompanies = (techCos) => {
    //general mapping function to map each company to a card
    return (
      <TechCompanyCards
        techCo={techCos}
        key={techCos.id}
        onEdit={onEditRequest}
        toggleModal={toggleModal}
        onDeleteRequested={onDeleteRequested}
      />
    );
  };

  const renderCompanies = () => {
    return (
      <div className="row flex-wrap d-flex card-deck justify-content-center">
        {companies.companyComponents}
      </div>
    );
  };

  const toggleModal = useCallback((company) => {
    //setting modal visibility on modal and receiving the company of the card you toggled the modal from via calling the function on the techCard page as props.toggleModal(company)
    _logger(company);
    setModalState((prevState) => {
      const modalInfo = { ...prevState };
      modalInfo.name = company.name;
      modalInfo.profile = company.profile;
      modalInfo.summary = company.summary;
      modalInfo.headline = company.headline;
      modalInfo.jobs = company.activeJobs;
      modalInfo.contactInfo = company?.contactInformation;
      modalInfo.isOpen = !prevState.isOpen;
      modalInfo.show = !prevState.show;
      _logger(modalInfo);
      return modalInfo;
    });
  }, []);

  const closeModal = () => {
    //setting only modal visibility when toggling modal
    setModalState((prevState) => {
      const modalInfo = { ...prevState };
      modalInfo.isOpen = !prevState.isOpen;
      modalInfo.show = !prevState.show;
      return modalInfo;
    });
  };

  return (
    <React.Fragment>
      <main role="main" className="jobs">
        <div className="container">
          <div className="formDiv d-flex align-items-center">
            <SearchBar
              onSearch={onSearchChange}
              onSearchSubmit={onSearchClicked}
            />

            <button
              className="btn btn-secondary hideShowCo rowButton px-5 mx-1"
              onClick={onHideShowClick}
            >
              {show.isShown && "Hide"}
              {!show.isShown && "Show"}
            </button>
            <Link
              to={"new"}
              className="btn mx-1 rowButton addCompany btn-success"
            >
              + Add Company
            </Link>
          </div>
          <div className="p-1 mb-4 techHeader eventHeader rounded-3">
            <div className="container-fluid py-1">
              <h1 className="display-5 fw-bold text-center text-dark">
                Tech Companies
              </h1>
              <SelectPagedItem
                pgInfo={pageInfo}
                changePageSize={onSelectPageSize}
                onPageChange={onPageChange}
              />
            </div>
          </div>
          {show.isShown && renderCompanies()}
          <hr />
        </div>
        <TechModal closeModal={closeModal} modalInfo={modalState} />
      </main>
    </React.Fragment>
  );
}

export default TechCompanies;
