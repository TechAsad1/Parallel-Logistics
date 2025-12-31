import initialState from "./Initial.value";

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        //CargoDetail
        case "getCargo":
            return { ...state, cargoDetailArr: action.payload };
        case "insertCargo":
            return { ...state, cargoDetailArr: [...state.cargoDetailArr, action.payload] };
        case "updateCargo":
            return {
                ...state,
                cargoDetailArr: state.cargoDetailArr.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case "deleteCargo":
            return { ...state, cargoDetailArr: state.cargoDetailArr.filter((x) => x.id !== action.payload) };

        //Customer
        case "getCustomer":
            return { ...state, customerArr: action.payload };
        case "insertCustomer":
            return { ...state, customerArr: [...state.customerArr, action.payload] };
        case "updateCustomer":
            return {
                ...state,
                customerArr: state.customerArr.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case "deleteCustomer":
            return { ...state, customerArr: state.customerArr.filter((x) => x.id !== action.payload) };

        //GrossWeight
        case "getGrossWeight":
            return { ...state, grossWeightArr: action.payload };
        case "insertGrossWeight":
            return { ...state, grossWeightArr: [...state.grossWeightArr, action.payload] };
        case "updateGrossWeight":
            return {
                ...state,
                grossWeightArr: state.grossWeightArr.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case "deleteGrossWeight":
            return { ...state, grossWeightArr: state.grossWeightArr.filter((x) => x.id !== action.payload) };

        //Job
        case "getJob":
            return { ...state, jobArr: action.payload };
        case "jobById":
            return { ...state, jobArr: action.payload };
        case "insertJob":
            return { ...state, jobArr: [...state.jobArr, action.payload] };
        case "updateJob":
            return {
                ...state,
                jobArr: state.jobArr.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case "deleteJob":
            return { ...state, jobArr: state.jobArr.filter((x) => x.id !== action.payload) };
        case "maxIdJob":
            return { ...state, maxId: action.payload };

        //JobType
        case "getJobType":
            return { ...state, jobTypeArr: action.payload };
        case "insertJobType":
            return { ...state, jobTypeArr: [...state.jobTypeArr, action.payload] };
        case "updateJobType":
            return {
                ...state,
                jobTypeArr: state.jobTypeArr.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case "deleteJobType":
            return { ...state, jobTypeArr: state.jobTypeArr.filter((x) => x.id !== action.payload) };

        //LoadingTerm
        case "getLoadingTerm":
            return { ...state, loadingTermArr: action.payload };
        case "insertLoadingTerm":
            return { ...state, loadingTermArr: [...state.loadingTermArr, action.payload] };
        case "updateLoadingTerm":
            return {
                ...state,
                loadingTermArr: state.loadingTermArr.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case "deleteLoadingTerm":
            return { ...state, loadingTermArr: state.loadingTermArr.filter((x) => x.id !== action.payload) };

        //Location
        case "getLocation":
            return { ...state, locationArr: action.payload };
        case "insertLocation":
            return { ...state, locationArr: [...state.locationArr, action.payload] };
        case "updateLocation":
            return {
                ...state,
                locationArr: state.locationArr.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case "deleteLocation":
            return { ...state, locationArr: state.locationArr.filter((x) => x.id !== action.payload) };

        //NetWeight
        case "getNetWeight":
            return { ...state, netWeightArr: action.payload };
        case "insertNetWeight":
            return { ...state, netWeightArr: [...state.netWeightArr, action.payload] };
        case "updateNetWeight":
            return {
                ...state,
                netWeightArr: state.netWeightArr.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case "deleteNetWeight":
            return { ...state, netWeightArr: state.netWeightArr.filter((x) => x.id !== action.payload) };
            
        //NoOfContainer
        case "getNoOfContainer":
            return { ...state, noOfContainerArr: action.payload };
        case "insertNoOfContainer":
            return { ...state, noOfContainerArr: [...state.noOfContainerArr, action.payload] };
        case "updateNoOfContainer":
            return {
                ...state,
                noOfContainerArr: state.noOfContainerArr.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case "deleteNoOfContainer":
            return { ...state, noOfContainerArr: state.noOfContainerArr.filter((x) => x.id !== action.payload) };

        //PortOfDischarge
        case "getPortOfDischarge":
            return { ...state, portOfDischargeArr: action.payload };
        case "insertPortOfDischarge":
            return { ...state, portOfDischargeArr: [...state.portOfDischargeArr, action.payload] };
        case "updatePortOfDischarge":
            return {
                ...state,
                portOfDischargeArr: state.portOfDischargeArr.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case "deletePortOfDischarge":
            return { ...state, portOfDischargeArr: state.portOfDischargeArr.filter((x) => x.id !== action.payload) };

        //PortOfLoading
        case "getPortOfLoading":
            return { ...state, portOfLoadingArr: action.payload };
        case "insertPortOfLoading":
            return { ...state, portOfLoadingArr: [...state.portOfLoadingArr, action.payload] };
        case "updatePortOfLoading":
            return {
                ...state,
                portOfLoadingArr: state.portOfLoadingArr.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case "deletePortOfLoading":
            return { ...state, portOfLoadingArr: state.portOfLoadingArr.filter((x) => x.id !== action.payload) };

        //ShippingLine
        case "getShippingLine":
            return { ...state, shippingLineArr: action.payload };
        case "insertShippingLine":
            return { ...state, shippingLineArr: [...state.shippingLineArr, action.payload] };
        case "updateShippingLine":
            return {
                ...state,
                shippingLineArr: state.shippingLineArr.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case "deleteShippingLine":
            return { ...state, shippingLineArr: state.shippingLineArr.filter((x) => x.id !== action.payload) };

        //User
        case "getUser":
            return { ...state, userArr: action.payload };
        case "insertUser":
            return { ...state, userArr: [...state.userArr, action.payload] };
        case "updateUser":
            return {
                ...state,
                userArr: state.userArr.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case "deleteUser":
            return { ...state, userArr: state.userArr.filter((x) => x.id !== action.payload) };

        //Vessel
        case "getVessel":
            return { ...state, vesselArr: action.payload };
        case "insertVessel":
            return { ...state, vesselArr: [...state.vesselArr, action.payload] };
        case "updateVessel":
            return {
                ...state,
                vesselArr: state.vesselArr.map((post) =>
                    post.id === action.payload.id ? action.payload : post
                ),
            };
        case "deleteVessel":
            return { ...state, vesselArr: state.vesselArr.filter((x) => x.id !== action.payload) };

        //InvID
        case "invIDVar":
            return { ...state, invID: action.payload };

        default:
            return state;
    }
}
export default Reducer;
