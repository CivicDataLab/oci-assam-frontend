export interface Tender {
  ocid: string;
  id: string;
  date: string;
  tag?: string[] | null;
  initiationType: string;
  parties?: PartiesEntity[] | null;
  buyer?:
    | BuyerEntityOrProcuringEntityEntityOrTenderersEntityOrSuppliersEntity[]
    | null;
  tender?: TenderEntity[] | null;
  bids?: BidsEntity[] | null;
  awards?: AwardsEntity[] | null;
  statistics?: StatisticsEntity[] | null;
}
export interface PartiesEntity {
  id: string;
  name: string;
  address?: AddressEntity[] | null;
  roles?: string[] | null;
}
export interface AddressEntity {
  streetAddress: string;
}
export interface BuyerEntityOrProcuringEntityEntityOrTenderersEntityOrSuppliersEntity {
  name: string;
  id: string;
}
export interface TenderEntity {
  id: string;
  title: string;
  description: string;
  datePublished: string;
  contractType: string;
  procuringEntity?:
    | BuyerEntityOrProcuringEntityEntityOrTenderersEntityOrSuppliersEntity[]
    | null;
  items?: ItemsEntity[] | null;
  value?: ValueEntity[] | null;
  procurementMethod: string;
  mainProcurementCategory: string;
  tenderPeriod?: TenderPeriodEntity[] | null;
  contractPeriod?: ContractPeriodEntityOrBidValidityPeriodEntity[] | null;
  communication?: CommunicationEntity[] | null;
  bidOpening?: BidOpeningEntity[] | null;
  participationFees?: ParticipationFeesEntity[] | null;
  numberOfTenderers: number;
  milestones?: MilestonesEntity[] | null;
  identifiers?: IdentifiersEntity[] | null;
  submissionTerms?: SubmissionTermsEntity[] | null;
  fiscalYear: string;
}
export interface ItemsEntity {
  id: string;
  classification?: ClassificationEntity[] | null;
  deliveryAddresses?: DeliveryAddressesEntity[] | null;
}
export interface ClassificationEntity {
  description: string;
}
export interface DeliveryAddressesEntity {
  postalCode: string;
  streetAdress: string;
  streetAddress: string;
}
export interface ValueEntity {
  amount: number;
  currency: string;
}
export interface TenderPeriodEntity {
  startDate: string;
  endDate: string;
  durationInDays: number;
}
export interface ContractPeriodEntityOrBidValidityPeriodEntity {
  durationInDays: number;
}
export interface CommunicationEntity {
  id: number;
  documentAvailabilityPeriod?: DocumentAvailabilityPeriodEntity[] | null;
}
export interface DocumentAvailabilityPeriodEntity {
  startDate: string;
  endDate: string;
}
export interface BidOpeningEntity {
  date: string;
  address?: AddressEntity[] | null;
}
export interface ParticipationFeesEntity {
  id: string;
  value?: ValueEntity[] | null;
  description: string;
}
export interface MilestonesEntity {
  id: string;
  title: string;
  type: string;
  dueDate: string;
}
export interface IdentifiersEntity {
  id: string;
  scheme: string;
}
export interface SubmissionTermsEntity {
  allowPreferentialBidder: string;
  allowMultiCurrencyFee: string;
  allowMultiCurrencyBQQ: string;
  bidValidityPeriod?: ContractPeriodEntityOrBidValidityPeriodEntity[] | null;
}
export interface BidsEntity {
  id: number;
  details?: DetailsEntity[] | null;
}
export interface DetailsEntity {
  id: string;
  date: string;
  status: string;
  tenderers?:
    | BuyerEntityOrProcuringEntityEntityOrTenderersEntityOrSuppliersEntity[]
    | null;
}
export interface AwardsEntity {
  id: string;
  value?: ValueEntity[] | null;
  suppliers?:
    | BuyerEntityOrProcuringEntityEntityOrTenderersEntityOrSuppliersEntity[]
    | null;
  contractPeriod?: ContractPeriodEntity[] | null;
}
export interface ContractPeriodEntity {
  startDate: string;
  durationInDays: number;
}
export interface StatisticsEntity {
  id: string;
  value: number;
  currency: string;
  measure: string;
}
