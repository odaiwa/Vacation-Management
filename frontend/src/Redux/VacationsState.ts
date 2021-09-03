import VacationsModel from "../Models/VacationsModel";


export class VacationsState {
    public vacations: VacationsModel[] = []; 
}

// Vacation Action Type: 
export enum VacationsActionType {
    VacationsDownloaded = "VacationsDownloaded",
    VacationAdded = "VacationAdded",
    VacationUpdated = "VacationUpdated",
    VacationDeleted = "VacationDeleted"
}

// Vacation Action:
export interface VacationAction {
    type: VacationsActionType;
    payload?: any; 
}

// Vacation Action Creators: 
export function vacationsDownloadedAction(vacations: VacationsModel[]): VacationAction {
    return { type: VacationsActionType.VacationsDownloaded, payload: vacations };
}
export function vacationAddedAction(addedProduct: VacationsModel): VacationAction {
    return { type: VacationsActionType.VacationAdded, payload: addedProduct };
}
export function vacationUpdatedAction(updatedProduct: VacationsModel): VacationAction {
    return { type: VacationsActionType.VacationUpdated, payload: updatedProduct };
}
export function vacationDeletedAction(id: number): VacationAction {
    return { type: VacationsActionType.VacationDeleted, payload: id };
}

// Vacation Reducer: 
export function vacationsReducer(currentState: VacationsState = new VacationsState(), action: VacationAction): VacationsState {

    const newState = { ...currentState };

    switch (action.type) {

        case VacationsActionType.VacationsDownloaded: // payload = all vacations
            newState.vacations = action.payload;
            break;

        case VacationsActionType.VacationAdded: // payload = added vacation
            newState.vacations.push(action.payload);
            break;

        case VacationsActionType.VacationUpdated: // payload = updated vacation
            const indexToUpdate = newState.vacations.findIndex(v => v.vacationId === action.payload.vacationId);
            newState.vacations[indexToUpdate] = action.payload;
            break;

        case VacationsActionType.VacationDeleted: // payload = vacation id to delete
            const indexToDelete = newState.vacations.findIndex(v => v.vacationId === action.payload);
            newState.vacations.splice(indexToDelete, 1);
            break;
    }

    return newState;

}