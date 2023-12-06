import {User}  from "../UserAuth";

export const GetConfigInfo = async () => {
    const _init : Object = {
        Sheet_ID : "1WJeKhJLsmuP4TF5pMiZeIVfMTgto25lQ2yVN1bREKHQ",
        Range : "Configs!A:G"
    }

    return HeaderKeysEncoding(await GetDataFromSheet(_init))
}

export const GetDataFromSheet = async (props: any) => {
    const user = User();
    console.log("GetDataFromSheet", props, props.Sheet_ID, props.Range)
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${props.Sheet_ID}/values/${props.Range}`,
            {
                headers: {
                    Authorization: `Bearer ${user?.user_info?.token}`,
                    "Content-Type": "application/json"
                },
            }
        );
        if (response.ok) {
            const data = await response.json();
            console.log(data.values);
            // return HeaderKeysEncoding(data.values);
            return data.values
        } else {
            console.log("GetDataFromSheet", props.props, props.Sheet_ID, props.Range)
            console.error("Failed to fetch data", response);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}

export const HeaderKeysEncoding =  (data : any) => {
    console.log(data)
    const [Headers, ...body] = data;
    let returnData: any = [ ]

    for( let row of body){
        let rowObject: { [key: string]: any } = {};
        for (let i = 0; i < Headers.length; i++) {
            rowObject[Headers[i]] = row[i];
        }
        returnData.push(rowObject);
    }
console.log(returnData)
    return returnData
}

export const _get_PMD_Engineered_Data = async () => {
    const user = User();

    try {
        const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/1_u95ycKX2f4cEjEpoU8wXOjGWHVTUyTZqhy2ooZvwwc/values/Engineered!A3:S`,
        {
            headers: {
            Authorization: `Bearer ${user?.user_info?.token}`,
            "Content-Type": "application/json"
            },
        }
        );
        if (response.ok) {
        const data = await response.json();
        console.log(data.values);
        return data.values.map(EngineeredEncoder);
        } else {
        console.error("Failed to fetch data", response);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        return []; // Return an empty array or handle the error according to your application's requirements
    }
}

// export const CustomerList = async () => {
//   // const { user } = UserAuth();
//
//   try {
//     const response = await fetch(
//       `https://sheets.googleapis.com/v4/spreadsheets/1vaBPZ8w5fzgM4mTGv7disZHMp3WQIzxDEEXKtM7e0Qg/values:batchGet?ranges=${encodeURIComponent(
//         "CustomerList!A4:I"
//       )}&majorDimension=ROWS`,
//       {
//         headers: {
//           // Authorization: `Bearer ${user?.accessToken}`,
//           "Content-Type": "application/json",
//           redirect: "follow",
//         },
//       }
//     );
//     if (response.ok) {
//       const data = await response.json();
//       console.log(data);
//       return data.values.map(CustomerListEncode);
//     } else {
//       throw new Error("Failed to fetch data");
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return []; // Return an empty array or handle the error according to your application's requirements
//   }
// };

// export const MasterData = async (props: any) => {
//   let start = new Date();
//   console.log("Started Fetching: ", start.toLocaleTimeString());

//   let DefaultRanges: any = {
//     ATicket: "Open Tickets Auto!A3:R",
//     OTickets: "Full Log!A2:T",
//     CustomerList: "CustomerList!A4:I",
//     Emails: "Email Logs!A2:I",
//     Uploads: "Uploads!A2:E",
//     UnrepliedButDoneThreads: "UnrepliedButDoneThreads!A2:D",
//     Users: "support-users!A1:A",
//   };
//   let range = "";
//   switch (true) {
//     case props.length > 0:
//       range = props
//         .map((e: any) => `ranges=${encodeURIComponent(DefaultRanges[e])}`)
//         .join("&");
//       break;
//     default:
//       range = Object.values(DefaultRanges)
//         .map((e: any) => `ranges=${encodeURIComponent(e)}`)
//         .join("&");
//       break;
//   }

//   return new Promise(async (resolve, reject) => {
//     fetch(
//       `https://sheets.googleapis.com/v4/spreadsheets/1vaBPZ8w5fzgM4mTGv7disZHMp3WQIzxDEEXKtM7e0Qg/values:batchGet?${range}&majorDimension=ROWS`,
//       {
//         headers: header,
//       }
//     )
//       .then((response: any) => response.json())
//       .then((data) => {
//         if (data.error) {
//           console.error(data);
//           reject(data);
//         } else {
//           let returnData: Object = {
//             Tickets: [],
//             CustomerList: [],
//             Emails: [],
//             Uploads: [],
//             Users: [],
//           };
//           data.valueRanges.forEach((eachSheetResponse: any) =>
//             EncodeDataAsJSON(eachSheetResponse, returnData)
//           );

//           resolve(returnData);
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         reject(error);
//       });
//   });
// };

// const EncodeDataAsJSON = (response: any, returnData: any) => {
//   switch (true) {
//     case response.range.includes("Open Tickets Auto"):
//       returnData.Tickets.push(...response.values.map(OpenTicketsEncode));
//       break;
//     case response.range.includes("Full Log"):
//       returnData.Tickets.push(...response.values.map(OldTicketsEncode));
//       break;
//     case response.range.includes("CustomerList"):
//       returnData.CustomerList.push(...response.values.map(CustomerListEncode));
//       break;
//     case response.range.includes("Email"):
//       returnData.Emails.push(...response.values.map(EmailsEncode));
//       break;
//     case response.range.includes("Uploads"):
//       returnData.Uploads.push(...response.values.map(UploadsEncode));
//       break;
//     case response.range.includes("support-users"):
//       returnData.Users.push(...response.values.flat());
//       break;
//   }
// };

// const OpenTicketsEncode = (response: any) => {
//   return {
//     CustomerName: response[0],
//     DateofTicket: response[1],
//     ProductDetails: response[2],
//     TicketCreatedByUser: response[3],
//     CommunicationMedium: response[4],
//     RequestByCustomer: response[5],
//     RootCause: response[6],
//     Solution: response[7],
//     HW: response[8],
//     OnField: response[9],
//     Asana: response[10],
//     Pending: response[11],
//     ClosedStatus: response[12],
//     ClosedBy: response[13],
//     LastModifiedDate: response[14],
//     DeviceID: response[15],
//     TicketID: response[16],
//     AssignedTo: response[17],
//     Source: "Auto Ticket Sheet",
//   };
// };
// const OldTicketsEncode = (response: any) => {
//   return {
//     CustomerName: response[0],
//     DateofTicket: response[1],
//     ProductDetails: response[2],
//     TicketCreatedByUser: response[3],
//     CommunicationMedium: response[4],
//     RequestByCustomer: response[5],
//     RootCause: response[6],
//     Solution: response[7],
//     HW: response[8],
//     OnField: response[9],
//     Asana: response[10],
//     Pending: response[11],
//     ClosedStatus: response[12],
//     ClosedBy: response[13],
//     LastModifiedDate: response[14],
//     DeviceID: response[17],
//     TicketID: response[18],
//     AssignedTo: response[19],
//     Source: "Full Logs Sheet",
//   };
// };
export const CustomerListEncode = (response: any) => {
  return {
    CustomerName: response[0],
    ProductName: response[1],
    WhatsappGroupName: response[2],
    TeamviewerID: response[3],
    BoringProxy: response[4],
    InstalledOn: response[5],
    WarrantyExpiringOn: response[6],
    DeviceID: response[7],
    DeploymentsID: response[8],
  };
};

export const EngineeredEncoder = (response: any) => {
    const [
SlNo,
PartNumber,
Name,
PartDescription,
Revision,
Drawing,
_2DCAD,
_3DCAD,
Material,
Process,
Finish,
Cost,
Supplier,
RoHS,
ISO13485,
IsTraceable,
InDemand,
InOrder,
InStock,
    ] = response;

    return {
        SlNo,
        PartNumber,
        Name,
        PartDescription,
        Revision,
        Drawing,
        _2DCAD,
        _3DCAD,
        Material,
        Process,
        Finish,
        Cost,
        Supplier,
        RoHS,
        ISO13485,
        IsTraceable,
        InDemand,
        InOrder,
        InStock,
    };
};


// export const EngineeredEncoder = (response: any) => {
//     return {
//         SlNo : response[0],
//         PartNumber : response[1],
//         Name : response[2],
//         PartDescription : response[3],
//         Revision : response[4],
//         Drawing : response[5],
//         _2DCAD : response[6],
//         _3DCAD : response[7],
//         Material : response[8],
//         Process : response[9],
//         Finish : response[10],
//         Cost : response[11],
//         Supplier : response[12],
//         RoHS : response[13],
//         ISO13485 : response[14],
//         IsTraceable : response[15],
//         InDemand : response[16],
//         InOrder : response[17],
//         InStock : response[18],
//     };
// };
// const EmailsEncode = (response: any) => {
//   return {
//     Date: response[0],
//     ThreadID: response[1],
//     MessageID: response[2],
//     Sender: response[3],
//     To: response[4],
//     Other_Emails_Included: response[5],
//     Subject: response[6],
//     Message: response[7],
//     IsReplied: response[8],
//   };
// };
// const UploadsEncode = (response: any) => {
//   return {
//     Date: response[0],
//     CustomerID: response[1],
//     FileName: response[2],
//     FileID: response[3],
//     TicketID: response[4],
//   };
// };
