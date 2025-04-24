import {request} from '@playwright/test';

async function deleteRequest(requestNumber) {
    const httpCredentials = {
        username: 'CX_ADMIN',
        password: 'Welcome@123',
    };

    const apiContext = await request.newContext({
        httpCredentials: {
            username: 'CX_ADMIN',
            password: 'Welcome@123'
        }
    });

    const url = `https://iaczkf-test.fa.ocs.oraclecloud.com/crmRestApi/resources/11.13.18.05/serviceRequests/${requestNumber}`;

    const response = await apiContext.delete(url, {
        headers : {
            "header" :'Content-Type: application/json',
            "authorization" : "Basic Q1hfQURNSU46V2VsY29tZUAxMjM="
        },
    });
    
    const res = await response.text();
    if(response.status === 204){
        const data = JSON.parse(res);
        console.log(data.SrNumber);
    } else {
        console.log(res);
    }

}

module.exports = {
    deleteRequest,
}