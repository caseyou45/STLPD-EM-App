interface ICall {
  datetime: Date;
  eventID: string;
  location: string;
  type: string;
}

interface ICallDTO {
  date: String;
  time: String;
  eventID: string;
  location: string;
  locationCount: number;
  type: string;
  typeCount: number;
  neighborhood: string;
  neighborhoodCount: number;
}

interface ICreateCallInput {
  datetime: ICall['datetime'];
  eventID: ICall['eventID'];
  location: ICall['location'];
  type: ICall['type'];
}

export { ICreateCallInput, ICall, ICallDTO };
