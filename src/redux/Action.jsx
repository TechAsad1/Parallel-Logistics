import axios from "axios";
import config from "../redux/Config";

const mainUrl = config.url;
//CargoDetail
const CargoDetailUrl = mainUrl + "CargoDetail";
export const getCargo = () => async (dispatch) => {
  try {
    const rec = await axios.get(CargoDetailUrl);
    dispatch({ type: "getCargo", payload: rec.data });
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
export const updateCargo = (x) => async (dispatch) => {
  try {
    await axios.post(CargoDetailUrl, x).then((e) => {
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
export const insertCustomer = (x) => async (dispatch) => {
  try {
    await axios.post(customerUrl, x).then((e) => {
      dispatch({ type: "insertCustomer", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateCustomer = (x) => async (dispatch) => {
  try {
    await axios.post(customerUrl, x).then((e) => {
      dispatch({ type: "updateCustomer", payload: e.data });
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
    const rec = await axios.get(grossWeightUrl);
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
    const rec = await axios.get(jobUrl);
    dispatch({ type: "getJob", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertJob = (x, loadStates, resetFormControls) => async (dispatch) => {
  try {
    await axios.post(jobUrl, x).then((e) => {
      dispatch({ type: "insertJob", payload: e.data });
      dispatch(maxIdJob());
      if (loadStates) loadStates();
      if (resetFormControls) resetFormControls();
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateJob = (id, x, loadStates) => async (dispatch) => {
  try {
    await axios.post(jobUrl + `/${id}`, x).then((e) => {
      dispatch({ type: "updateJob", payload: e.data });
      if (loadStates) loadStates();
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

//JobType
const jobTypeUrl = mainUrl + "JobType";
export const getJobType = () => async (dispatch) => {
  try {
    const rec = await axios.get(jobTypeUrl);
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
    const rec = await axios.get(loadingTermUrl);
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
    const rec = await axios.get(locationUrl);
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
    const rec = await axios.get(netWeightUrl);
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
    const rec = await axios.get(noOfContainerUrl);
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
    const rec = await axios.get(portOfDischargeUrl);
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
    const rec = await axios.get(portOfLoadingUrl);
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
    const rec = await axios.get(shippingLineUrl);
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
    const rec = await axios.get(userUrl);
    dispatch({ type: "getUser", payload: rec.data });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const insertUser = (x) => async (dispatch) => {
  try {
    await axios.post(userUrl, x).then((e) => {
      dispatch({ type: "insertUser", payload: e.data });
    });
  }
  catch (err) {
    console.log(err.message);
  }
};
export const updateUser = (x) => async (dispatch) => {
  try {
    await axios.post(userUrl, x).then((e) => {
      dispatch({ type: "updateUser", payload: e.data });
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

//Vessel
const vesselUrl = mainUrl + "Vessel";
export const getVessel = () => async (dispatch) => {
  try {
    const rec = await axios.get(vesselUrl);
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



//InvID
export const invIDVar = "InvID";
export const setInvID = (val) => (dispatch) => {
  dispatch({ type: invIDVar, payload: val });
};
