import axios from "axios";
import config from "../redux/Config";

const mainUrl = config.url;
//Dashboard
const dashboardUrl = mainUrl + "Dashboard";
export const GetJobProgressAsync = (fromDate, toDate) => async (dispatch) => {
  try {
    const rec = await axios.get(`${dashboardUrl}/GetJobProgressAsync?fromDate=${fromDate}&toDate=${toDate}`);
    dispatch({ type: "getJobProgressAsync", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const GetJobSummaryCountAsync = (fromDate, toDate) => async (dispatch) => {
  try {
    const rec = await axios.get(`${dashboardUrl}/GetJobSummaryCountAsync?fromDate=${fromDate}&toDate=${toDate}`);
    dispatch({ type: "getJobSummaryCountAsync", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const GetJobSummaryMonthWiseAsync = (fromDate, toDate) => async (dispatch) => {
  try {
    const rec = await axios.get(`${dashboardUrl}/GetJobSummaryMonthWiseAsync?fromDate=${fromDate}&toDate=${toDate}`);
    dispatch({ type: "getJobSummaryMonthWiseAsync", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};

export const GetJobProgressByUserIdAsync = (id, fromDate, toDate) => async (dispatch) => {
  try {
    const rec = await axios.get(`${dashboardUrl}/GetJobProgressByUserIdAsync/${id}?fromDate=${fromDate}&toDate=${toDate}`);
    dispatch({ type: "getJobProgressAsync", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const GetJobSummaryCountByUserIdAsync = (id, fromDate, toDate) => async (dispatch) => {
  try {
    const rec = await axios.get(`${dashboardUrl}/GetJobSummaryCountByUserIdAsync/${id}?fromDate=${fromDate}&toDate=${toDate}`);
    dispatch({ type: "getJobSummaryCountAsync", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const GetJobSummaryMonthWiseByUserIdAsync = (id, fromDate, toDate) => async (dispatch) => {
  try {
    const rec = await axios.get(`${dashboardUrl}/GetJobSummaryMonthWiseByUserIdAsync/${id}?fromDate=${fromDate}&toDate=${toDate}`);
    dispatch({ type: "getJobSummaryMonthWiseAsync", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};

//CargoDetail
const CargoDetailUrl = mainUrl + "CargoDetail";
export const getCargo = () => async (dispatch) => {
  try {
    const rec = await axios.get(CargoDetailUrl + "/DTO");
    dispatch({ type: "getCargo", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const getCargoById = (id) => async (dispatch) => {
  try {
    const rec = await axios.get(CargoDetailUrl + `/${id}`);
    dispatch({ type: "cargoById", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertCargo = (x) => async (dispatch) => {
  try {
    await axios.post(CargoDetailUrl, x).then((e) => {
      dispatch({ type: "insertCargo", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateCargo = (id, x) => async (dispatch) => {
  try {
    await axios.put(CargoDetailUrl + `/${id}`, x).then((e) => {
      dispatch({ type: "updateCargo", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteCargo = (id) => async (dispatch) => {
  try {
    await axios.delete(CargoDetailUrl + `/${id}`).then(() => {
      dispatch({ type: "deleteCargo", payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//Customer
const customerUrl = mainUrl + "Customer";
export const getCustomer = () => async (dispatch) => {
  try {
    const rec = await axios.get(customerUrl);
    dispatch({ type: "getCustomer", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const getCustomerById = (id) => async (dispatch) => {
  try {
    const rec = await axios.get(customerUrl + `/${id}`);
    dispatch({ type: "customerById", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertCustomer = (x, recordInsertMessage) => async (dispatch) => {
  try {
    await axios.post(customerUrl, x).then((e) => {
      dispatch({ type: "insertCustomer", payload: e.data });
      recordInsertMessage();
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateCustomer = (id, x, recordUpdatedMessage) => async (dispatch) => {
  try {
    await axios.put(customerUrl + `/${id}`, x).then((e) => {
      dispatch({ type: "updateCustomer", payload: e.data });
      recordUpdatedMessage();
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteCustomer = (id) => async (dispatch) => {
  try {
    await axios.delete(customerUrl + `/${id}`).then(() => {
      dispatch({ type: "deleteCustomer", payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//GrossWeight
const grossWeightUrl = mainUrl + "GrossWeight";
export const getGrossWeight = () => async (dispatch) => {
  try {
    const rec = await axios.get(grossWeightUrl + "/DTO");
    dispatch({ type: "getGrossWeight", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertGrossWeight = (x) => async (dispatch) => {
  try {
    await axios.post(grossWeightUrl, x).then((e) => {
      dispatch({ type: "insertGrossWeight", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateGrossWeight = (x) => async (dispatch) => {
  try {
    await axios.post(grossWeightUrl, x).then((e) => {
      dispatch({ type: "updateGrossWeight", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteGrossWeight = (id) => async (dispatch) => {
  try {
    await axios.delete(grossWeightUrl + `/${id}`).then(() => {
      dispatch({ type: "deleteGrossWeight", payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//Job
const jobUrl = mainUrl + "Job";
export const getJob = () => async (dispatch) => {
  try {
    const rec = await axios.get(jobUrl + "/DTOJobAsync");
    dispatch({ type: "getJob", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const getJobByUserId = (id) => async (dispatch) => {
  try {
    console.log(id);
    const rec = await axios.get(jobUrl + "/JobsByUserIdAsync/" + `${id}`);
    dispatch({ type: "jobsByUserIdResponse", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertJob = (x, loadStates, resetFormControls, recordInsertedMessage, setInsertJobArr) => async (dispatch) => {
  try {
    await axios.post(jobUrl, x).then((e) => {
      dispatch({ type: "insertJob", payload: e.data });
      setInsertJobArr(e.data);
      dispatch(maxIdJob());
      if (recordInsertedMessage) recordInsertedMessage();
      if (loadStates) loadStates();
      if (resetFormControls) resetFormControls();
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateJob = (id, x, loadStates, recordUpdatedMessage) => async (dispatch) => {
  try {
    await axios.put(jobUrl + `/${id}`, x).then((e) => {
      dispatch({ type: "updateJob", payload: e.data });
      if (loadStates) loadStates();
      recordUpdatedMessage();
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteJob = (id) => async (dispatch) => {
  try {
    await axios.delete(jobUrl + `/${id}`).then(() => {
      dispatch({ type: "deleteJob", payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const maxIdJob = () => async (dispatch) => {
  try {
    await axios.get(jobUrl + "/max-id").then((e) => {
      dispatch({ type: "maxIdJob", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const jobById = (id) => async (dispatch) => {
  try {
    await axios.get(jobUrl + `/${id}`).then((e) => {
      dispatch({ type: "jobById", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateJobCheckStatus = (column, x, isChecked, updateStatusMessage) => async (dispatch) => {
  try {
    await axios.put(jobUrl + '/UpdateCheckedStatus', { jobId: x.jobId, step: column.charAt(0).toUpperCase() + column.slice(1), isChecked: isChecked }).then((e) => {
      dispatch({ type: "updateJobCheckStatus", payload: e.data });
      updateStatusMessage();
    });
  }
  catch (err) {
    console.log(err.message);
  }
};


//JobType
const jobTypeUrl = mainUrl + "JobType";
export const getJobType = () => async (dispatch) => {
  try {
    const rec = await axios.get(jobTypeUrl + "/DTO");
    dispatch({ type: "getJobType", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertJobType = (x) => async (dispatch) => {
  try {
    await axios.post(jobTypeUrl, x).then((e) => {
      dispatch({ type: "insertJobType", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateJobType = (x) => async (dispatch) => {
  try {
    await axios.post(jobTypeUrl, x).then((e) => {
      dispatch({ type: "updateJobType", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteJobType = (id) => async (dispatch) => {
  try {
    await axios.delete(jobTypeUrl + `/${id}`).then(() => {
      dispatch({ type: "deleteJobType", payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//LoadingTerm
const loadingTermUrl = mainUrl + "LoadingTerm";
export const getLoadingTerm = () => async (dispatch) => {
  try {
    const rec = await axios.get(loadingTermUrl + "/DTO");
    dispatch({ type: "getLoadingTerm", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertLoadingTerm = (x) => async (dispatch) => {
  try {
    await axios.post(loadingTermUrl, x).then((e) => {
      dispatch({ type: "insertLoadingTerm", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateLoadingTerm = (x) => async (dispatch) => {
  try {
    await axios.post(loadingTermUrl, x).then((e) => {
      dispatch({ type: "updateLoadingTerm", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteLoadingTerm = (id) => async (dispatch) => {
  try {
    await axios.delete(loadingTermUrl + `/${id}`).then(() => {
      dispatch({ type: "deleteLoadingTerm", payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//Location
const locationUrl = mainUrl + "Location";
export const getLocation = () => async (dispatch) => {
  try {
    const rec = await axios.get(locationUrl + "/DTO");
    dispatch({ type: "getLocation", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertLocation = (x) => async (dispatch) => {
  try {
    await axios.post(locationUrl, x).then((e) => {
      dispatch({ type: "insertLocation", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateLocation = (x) => async (dispatch) => {
  try {
    await axios.post(locationUrl, x).then((e) => {
      dispatch({ type: "updateLocation", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteLocation = (id) => async (dispatch) => {
  try {
    await axios.delete(locationUrl + `/${id}`).then(() => {
      dispatch({ type: "deleteLocation", payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//NetWeight
const netWeightUrl = mainUrl + "NetWeight";
export const getNetWeight = () => async (dispatch) => {
  try {
    const rec = await axios.get(netWeightUrl + "/DTO");
    dispatch({ type: "getNetWeight", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertNetWeight = (x) => async (dispatch) => {
  try {
    await axios.post(netWeightUrl, x).then((e) => {
      dispatch({ type: "insertNetWeight", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateNetWeight = (x) => async (dispatch) => {
  try {
    await axios.post(netWeightUrl, x).then((e) => {
      dispatch({ type: "updateNetWeight", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteNetWeight = (id) => async (dispatch) => {
  try {
    await axios.delete(netWeightUrl + `/${id}`).then(() => {
      dispatch({ type: "deleteNetWeight", payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//NoOfContainer
const noOfContainerUrl = mainUrl + "NoOfContainer";
export const getNoOfContainer = () => async (dispatch) => {
  try {
    const rec = await axios.get(noOfContainerUrl + "/DTO");
    dispatch({ type: "getNoOfContainer", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertNoOfContainer = (x) => async (dispatch) => {
  try {
    await axios.post(noOfContainerUrl, x).then((e) => {
      dispatch({ type: "insertNoOfContainer", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateNoOfContainer = (x) => async (dispatch) => {
  try {
    await axios.post(noOfContainerUrl, x).then((e) => {
      dispatch({ type: "updateNoOfContainer", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteNoOfContainer = (id) => async (dispatch) => {
  try {
    await axios.delete(noOfContainerUrl + `/${id}`).then(() => {
      dispatch({ type: "deleteNoOfContainer", payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//PortOfDischarge
const portOfDischargeUrl = mainUrl + "PortOfDischarge";
export const getPortOfDischarge = () => async (dispatch) => {
  try {
    const rec = await axios.get(portOfDischargeUrl + "/DTO");
    dispatch({ type: "getPortOfDischarge", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertPortOfDischarge = (x) => async (dispatch) => {
  try {
    await axios.post(portOfDischargeUrl, x).then((e) => {
      dispatch({ type: "insertPortOfDischarge", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updatePortOfDischarge = (x) => async (dispatch) => {
  try {
    await axios.post(portOfDischargeUrl, x).then((e) => {
      dispatch({ type: "updatePortOfDischarge", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deletePortOfDischarge = (id) => async (dispatch) => {
  try {
    await axios.delete(portOfDischargeUrl + `/${id}`).then(() => {
      dispatch({ type: "deletePortOfDischarge", payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//PortOfLoading
const portOfLoadingUrl = mainUrl + "PortOfLoading";
export const getPortOfLoading = () => async (dispatch) => {
  try {
    const rec = await axios.get(portOfLoadingUrl + "/DTO");
    dispatch({ type: "getPortOfLoading", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertPortOfLoading = (x) => async (dispatch) => {
  try {
    await axios.post(portOfLoadingUrl, x).then((e) => {
      dispatch({ type: "insertPortOfLoading", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updatePortOfLoading = (x) => async (dispatch) => {
  try {
    await axios.post(portOfLoadingUrl, x).then((e) => {
      dispatch({ type: "updatePortOfLoading", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deletePortOfLoading = (id) => async (dispatch) => {
  try {
    await axios.delete(portOfLoadingUrl + `/${id}`).then(() => {
      dispatch({ type: "deletePortOfLoading", payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//ShippingLine
const shippingLineUrl = mainUrl + "ShippingLine";
export const getShippingLine = () => async (dispatch) => {
  try {
    const rec = await axios.get(shippingLineUrl + "/DTO");
    dispatch({ type: "getShippingLine", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertShippingLine = (x) => async (dispatch) => {
  try {
    await axios.post(shippingLineUrl, x).then((e) => {
      dispatch({ type: "insertShippingLine", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateShippingLine = (x) => async (dispatch) => {
  try {
    await axios.post(shippingLineUrl, x).then((e) => {
      dispatch({ type: "updateShippingLine", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteShippingLine = (id) => async (dispatch) => {
  try {
    await axios.delete(shippingLineUrl + `/${id}`).then(() => {
      dispatch({ type: "deleteShippingLine", payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//User
const userUrl = mainUrl + "User";
export const getUser = () => async (dispatch) => {
  try {
    const rec = await axios.get(userUrl + "/DTOUsers");
    dispatch({ type: "getUser", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const getUserById = (id) => async (dispatch) => {
  try {
    const rec = await axios.get(userUrl + `/${id}`);
    dispatch({ type: "getUserById", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertUser = (x, recordInsertMessage, onClose) => async (dispatch) => {
  try {
    await axios.post(userUrl, x).then((e) => {
      dispatch({ type: "insertUser", payload: e.data });
      recordInsertMessage();
      onClose();
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateUser = (id, x, recordUpdatedMessage) => async (dispatch) => {
  try {
    await axios.put(userUrl + `/${id}`, x).then((e) => {
      dispatch({ type: "updateUser", payload: e.data });
      recordUpdatedMessage();
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteUser = (id) => async (dispatch) => {
  try {
    await axios.delete(userUrl + `/${id}`).then(() => {
      dispatch({ type: "deleteUser", payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};

//Login
const loginUrl = mainUrl + "Login";
export const login = (x, onSuccess, onError) => async (dispatch) => {
  try {
    await axios.post(loginUrl, x).then((e) => {
      dispatch({ type: "loginResponse", payload: e.data });
      if (onSuccess) onSuccess(e.data);
    });
  }
  catch (err) {
    if (onError) onError("Invalid username or password!");
  }
};

//Vessel
const vesselUrl = mainUrl + "Vessel";
export const getVessel = () => async (dispatch) => {
  try {
    const rec = await axios.get(vesselUrl + "/DTO");
    dispatch({ type: "getVessel", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertVessel = (x) => async (dispatch) => {
  try {
    await axios.post(vesselUrl, x).then((e) => {
      dispatch({ type: "insertVessel", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateVessel = (x) => async (dispatch) => {
  try {
    await axios.post(vesselUrl, x).then((e) => {
      dispatch({ type: "updateVessel", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const deleteVessel = (id) => async (dispatch) => {
  try {
    await axios.delete(vesselUrl + `/${id}`).then(() => {
      dispatch({ type: "deleteVessel", payload: id });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};


//JobAssign
const jobAssignUrl = mainUrl + "JobAssign";
export const insertJobAssign = (x) => async (dispatch) => {
  try {
    await axios.post(jobAssignUrl, x).then((e) => {
      dispatch({ type: "updateJobAssign", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateJobAssign = (id, x) => async (dispatch) => {
  try {
    await axios.put(jobAssignUrl + `/${id}`, x).then((e) => {
      dispatch({ type: "updateJobAssign", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const existsJobAssign = (id, x) => async (dispatch) => {
  try {
    await axios.get(jobAssignUrl + '/ExistsAsync?id=' + `${id}`).then((e) => {
      if (e.data === true && id > 0)
        dispatch(updateJobAssign(id, x));
      else
        dispatch(insertJobAssign(x));
      dispatch({ type: "existsJobAssign", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};



//InvID
export const invIDVar = "InvID";
export const setInvID = (val) => (dispatch) => {
  dispatch({ type: invIDVar, payload: val });
};
