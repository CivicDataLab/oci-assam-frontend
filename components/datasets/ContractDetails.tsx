import DList from 'components/_shared/DList';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/_shared';
import React from 'react';

export const ContractDetails = ({ dataPackage }) => {
  const basicContent = [
    {
      title: 'Open contracting ID',
      desc: dataPackage.ocid || '--',
    },
    {
      title: 'Tender Title',
      desc: dataPackage.tender[0].title || '--',
    },
    {
      title: 'Tender ID',
      desc: dataPackage.tender[0].id || '--',
    },
    {
      title: 'Tender Reference Number',
      desc: dataPackage.tender[0].identifiers[0].id || '--',
    },

    {
      title: 'Organisation Chain',
      desc: dataPackage.buyer[0].name || '--',
    },
    {
      title: 'Tender amount',
      desc: dataPackage.tender[0].value
        ? `${dataPackage.tender[0].value[0].currency} ${commaNumber(
            dataPackage.tender[0].value[0].amount
          )}`
        : '--',
    },
    {
      title: 'Tender Category',
      desc:
        dataPackage.tender[0].items[0].classification[0].description || '--',
    },
  ];

  const dateContent = dataPackage.tender[0].milestones.map(
    (milestone: any) => {
      return {
        title: milestone.title,
        desc: milestone.dueDate,
      };
    }
  );

  const tenderDetails = [
    {
      title: 'Work Description',
      desc: dataPackage.tender[0].description || '--',
    },
    {
      title: 'Product Category',
      desc:
        dataPackage.tender[0].items[0].classification[0].description || '--',
    },
    {
      title: 'Contract Type',
      desc: dataPackage.tender[0].contractType || '--',
    },
    {
      title: 'Published Date',
      desc: dataPackage.tender[0].datePublished || '--',
    },
    {
      title: 'Period of Work (Days)',
      desc: dataPackage.tender[0].contractPeriod[0].durationInDays || '--',
    },
  ];

  const invitingAuthority = [
    {
      title: 'Name',
      desc: dataPackage.tender[0].procuringEntity[0].name || '--',
    },
    {
      title: 'Fee Payable To',
      desc: dataPackage.tender[0].participationFees[0].description || '--',
    },
    {
      title: 'Tender Fee in Rs',
      desc: dataPackage.tender[0].participationFees[0].value[0].amount || '--',
    },
    {
      title: 'Location',
      desc:
        dataPackage.tender[0].items[0].deliveryAddresses[0].streetAddress ||
        '--',
    },
    {
      title: 'Pincode',
      desc:
        Number.parseInt(
          dataPackage.tender[0].items[0].deliveryAddresses[0].postalCode
        ) || '--',
    },
  ];

  const bidderDetails = [
    {
      title: 'Bid Validity(Days)',
      desc:
        dataPackage.tender[0].submissionTerms[0].bidValidityPeriod[0]
          .durationInDays || '--',
    },
    {
      title: 'Bid Opening Place',
      desc:
        dataPackage.tender[0].bidOpening[0].address[0].streetAddress || '--',
    },
    {
      title: 'Bidder Information',
      desc: dataPackage.bids ? (
        <Table className="bg-white mt-4 rounded-sm shadow-sm">
          <TableHeader>
            <TableRow>
              <TableHead className="">Bidder Name</TableHead>
              <TableHead>Bid Submission Date</TableHead>
              <TableHead>Bid Value</TableHead>
              <TableHead>Bidder Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataPackage.bids[0].details.map((bid: any) => {
              return (
                <TableRow key={bid.id}>
                  <TableCell>{bid.tenderers[0].name}</TableCell>
                  <TableCell>{bid.date || '--'}</TableCell>
                  <TableCell>{commaNumber(bid.id)}</TableCell>
                  <TableCell>{bid.status || '--'}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        '--'
      ),
    },
  ];

  const awardDetails = [
    {
      title: 'Awarded Value',
      desc: dataPackage.awards
        ? commaNumber(dataPackage.awards[0].value[0].amount)
        : '--',
    },
    {
      title: 'Awarded Currency',
      desc: dataPackage.awards
        ? dataPackage.awards[0].value[0].currency
        : '--',
    },
    {
      title: 'Contract Date',
      desc: dataPackage.awards
        ? dataPackage.awards[0].contractPeriod[0].startDate
        : '--',
    },
    {
      title: 'Contract Value',
      desc: dataPackage.statistics
        ? commaNumber(dataPackage.statistics[0].value)
        : '--',
    },
    {
      title: 'Work Completion Period in days',
      desc: dataPackage.awards
        ? dataPackage.awards[0].contractPeriod[0].durationInDays
        : '--',
    },
  ];

  const contractDetails = [
    {
      name: 'Basic Info',
      data: basicContent,
      icon: icons.info,
    },
    {
      name: 'Tender and Work Details',
      data: tenderDetails,
      icon: icons.list,
    },
    {
      name: 'Critical Dates',
      data: dateContent,
      icon: icons.date,
    },
    {
      name: 'Tender Inviting Authority',
      data: invitingAuthority,
      icon: icons.list,
    },
    {
      name: 'Bid and Bidder Details',
      data: bidderDetails,
      icon: icons.list,
    },
    {
      name: 'Award Details',
      data: awardDetails,
      icon: icons.list,
    },
  ];

  return (
    <React.Fragment>
      {contractDetails.map((contractDetail, index) => {
        return (
          <section className="tender__item" key={index}>
            <h3 className="heading-3">
              {contractDetail.icon}
              {contractDetail.name}
            </h3>
            <DList content={contractDetail.data} />
          </section>
        );
      })}
    </React.Fragment>
  );
};

function commaNumber(num: number | string) {
  return String(num).replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
}

const icons = {
  info: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24ZM13.395 9.882L11.895 16.9395C11.79 17.4495 11.9385 17.739 12.351 17.739C12.642 17.739 13.0815 17.634 13.38 17.37L13.248 17.994C12.8175 18.513 11.868 18.891 11.0505 18.891C9.996 18.891 9.5475 18.258 9.8385 16.9125L10.9455 11.7105C11.0415 11.271 10.9545 11.112 10.515 11.0055L9.8385 10.884L9.9615 10.3125L13.3965 9.882H13.395ZM12 8.25C11.6022 8.25 11.2206 8.09196 10.9393 7.81066C10.658 7.52936 10.5 7.14782 10.5 6.75C10.5 6.35218 10.658 5.97064 10.9393 5.68934C11.2206 5.40804 11.6022 5.25 12 5.25C12.3978 5.25 12.7794 5.40804 13.0607 5.68934C13.342 5.97064 13.5 6.35218 13.5 6.75C13.5 7.14782 13.342 7.52936 13.0607 7.81066C12.7794 8.09196 12.3978 8.25 12 8.25Z"
        fill="black"
      />
    </svg>
  ),
  list: (
    <svg
      width="28"
      height="25"
      viewBox="0 0 28 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.15 0C2.31457 0 1.51335 0.370395 0.922614 1.0297C0.331874 1.68901 0 2.58322 0 3.51562V7.42188C0 8.35428 0.331874 9.24849 0.922614 9.9078C1.51335 10.5671 2.31457 10.9375 3.15 10.9375H6.65C7.48543 10.9375 8.28665 10.5671 8.87739 9.9078C9.46813 9.24849 9.8 8.35428 9.8 7.42188V3.51562C9.8 2.58322 9.46813 1.68901 8.87739 1.0297C8.28665 0.370395 7.48543 0 6.65 0H3.15ZM12.95 1.5625C12.6715 1.5625 12.4045 1.68596 12.2075 1.90573C12.0106 2.1255 11.9 2.42357 11.9 2.73438C11.9 3.04518 12.0106 3.34325 12.2075 3.56302C12.4045 3.78279 12.6715 3.90625 12.95 3.90625H26.95C27.2285 3.90625 27.4956 3.78279 27.6925 3.56302C27.8894 3.34325 28 3.04518 28 2.73438C28 2.42357 27.8894 2.1255 27.6925 1.90573C27.4956 1.68596 27.2285 1.5625 26.95 1.5625H12.95ZM12.95 6.25C12.6715 6.25 12.4045 6.37347 12.2075 6.59324C12.0106 6.813 11.9 7.11107 11.9 7.42188C11.9 7.73268 12.0106 8.03075 12.2075 8.25051C12.4045 8.47028 12.6715 8.59375 12.95 8.59375H22.75C23.0285 8.59375 23.2955 8.47028 23.4925 8.25051C23.6894 8.03075 23.8 7.73268 23.8 7.42188C23.8 7.11107 23.6894 6.813 23.4925 6.59324C23.2955 6.37347 23.0285 6.25 22.75 6.25H12.95ZM3.15 14.0625C2.31457 14.0625 1.51335 14.4329 0.922614 15.0922C0.331874 15.7515 0 16.6457 0 17.5781V21.4844C0 21.9461 0.0814772 22.4032 0.23978 22.8297C0.398082 23.2563 0.630109 23.6438 0.922614 23.9703C1.21512 24.2968 1.56237 24.5557 1.94455 24.7324C2.32672 24.9091 2.73634 25 3.15 25H6.65C7.06366 25 7.47328 24.9091 7.85545 24.7324C8.23763 24.5557 8.58488 24.2968 8.87739 23.9703C9.16989 23.6438 9.40192 23.2563 9.56022 22.8297C9.71852 22.4032 9.8 21.9461 9.8 21.4844V17.5781C9.8 16.6457 9.46813 15.7515 8.87739 15.0922C8.28665 14.4329 7.48543 14.0625 6.65 14.0625H3.15ZM12.95 15.625C12.6715 15.625 12.4045 15.7485 12.2075 15.9682C12.0106 16.188 11.9 16.4861 11.9 16.7969C11.9 17.1077 12.0106 17.4057 12.2075 17.6255C12.4045 17.8453 12.6715 17.9688 12.95 17.9688H26.95C27.2285 17.9688 27.4956 17.8453 27.6925 17.6255C27.8894 17.4057 28 17.1077 28 16.7969C28 16.4861 27.8894 16.188 27.6925 15.9682C27.4956 15.7485 27.2285 15.625 26.95 15.625H12.95ZM12.95 20.3125C12.6715 20.3125 12.4045 20.436 12.2075 20.6557C12.0106 20.8755 11.9 21.1736 11.9 21.4844C11.9 21.7952 12.0106 22.0932 12.2075 22.313C12.4045 22.5328 12.6715 22.6562 12.95 22.6562H22.75C23.0285 22.6562 23.2955 22.5328 23.4925 22.313C23.6894 22.0932 23.8 21.7952 23.8 21.4844C23.8 21.1736 23.6894 20.8755 23.4925 20.6557C23.2955 20.436 23.0285 20.3125 22.75 20.3125H12.95Z"
        fill="black"
      />
    </svg>
  ),
  date: (
    <svg
      width="28"
      height="27"
      viewBox="0 0 28 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.57143 0V8.96552M21.4286 0V8.96552M5.64286 13.4483H11.2143M22.3571 13.4483H16.7857M5.64286 18.8276H11.2143M16.7857 18.8276H22.3571M2.85714 4.48276H25.1429C26.1685 4.48276 27 5.28556 27 6.27586V24.2069C27 25.1972 26.1685 26 25.1429 26H2.85714C1.83147 26 1 25.1972 1 24.2069V6.27586C1 5.28556 1.83147 4.48276 2.85714 4.48276Z"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  ),
};
