import { combineReducers } from "redux";
import {memberReducer , getBranchReducer} from "./MemberModule";
import askReducer from "./AskModule";
import {humanReducer , humanBranchReducer} from "./HRModule";
import carReducer from "./CarModule";

import carInfoReducer from "./CarModule";

import { branchReducer } from "./BranchModule";

// 도아 - 보고서 
import { branchMemberReducer
    , branchSalesReducer , detailBranchSalesReducer
    , vehicleRepairReducer, detailVehicleRepairReducer
    , expenseReducer, detailExpenseReducer
    , findAllRepairReducer,detailRepairReducer
    , carMembersReducer
} from "./ReportsModule";

import {detergentsInfoReducer, partsInfoReducer, headStockHistoryReducer, branchStockHistoryReducer}  from "./StockModule";



const rootReducer = combineReducers({
    memberReducer,
    getBranchReducer,
    askReducer,

    humanReducer,
    humanBranchReducer,

    carReducer,

    carInfoReducer,

    branchMemberReducer,
    branchSalesReducer,
    detailBranchSalesReducer,
    vehicleRepairReducer,
    expenseReducer,
    detailExpenseReducer,
    detailVehicleRepairReducer,
    findAllRepairReducer,
    detailRepairReducer,
    carMembersReducer,
    
    detergentsInfoReducer,
    partsInfoReducer,
    headStockHistoryReducer,
    branchStockHistoryReducer,

    branchReducer

})



export default rootReducer;

