export interface PlayerSearches {
  location:             Location;
  _id:                  string;
  title:                string;
  position_needed:      PositionNeeded;
  created_by:           CreatedBy;
  match_date:           Date;
  match_time:           string;
  field_rental_payment: number;
  description:          string;
  created_at:           Date;
  updated_at:           Date;
  __v:                  number;
  player_interested?:   string;
}

export interface CreatedBy {
  _id:      string;
  username: string;
}

export interface Location {
  latitude:  number;
  longitude: number;
}

export enum PositionNeeded {
  Arquero = "arquero",
  Delantero = "delantero",
  Mediocampista = "mediocampista",
}
