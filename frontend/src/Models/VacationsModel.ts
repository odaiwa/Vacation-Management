class VacationsModel {
	public vacationId: number;
	public destination: string;
	public startDate: string;
	public endDate: string;
	public price: number;
	public description: string;
    public img: FileList ;

    public static convertToFormData(vacation: VacationsModel): FormData { 

        const myFormData = new FormData();
        myFormData.append("destination", vacation.destination);
        myFormData.append("startDate", vacation.startDate);
        myFormData.append("endDate", vacation.endDate);
        myFormData.append("price", vacation.price.toString());
        myFormData.append("description", vacation.description);
        myFormData.append("img", vacation.img.item(0));
        return myFormData;
    }
}

export default VacationsModel;
