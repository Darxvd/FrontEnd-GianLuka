export class PersonEntity{
    idPersona!: number;
    nomPersona!: string;
    aplPersona!: string;
    dniPersona!: string;
    idTipo!: number;
    celuPersona!: string;
    fnaciPersona!: string;
    correoPersona!: string;
    objType!: {
        idTipo: number;
        nomTipo: string;
        desTipo: string;
        activoTipo: string;
      };
    objSex!: {
        idSexo: number;
        nomSexo: string;
        desSexo: string;
    }
}