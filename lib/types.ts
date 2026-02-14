export type DiagnosticType =
  | 'dpe'
  | 'amiante'
  | 'plomb'
  | 'electricite'
  | 'gaz'
  | 'termites'
  | 'erp';

export type QuoteInput = {
  transaction: 'vente' | 'location';
  propertyType: 'maison' | 'appartement' | 'immeuble' | 'local pro';
  address: string;
  year: number;
  surface: number;
  hasElectricity: boolean;
  hasGas: boolean;
  hasValidDpe: boolean;
  termitesConfirmed: boolean;
  options: {
    mesurage: boolean;
    prelevement: boolean;
  };
};
