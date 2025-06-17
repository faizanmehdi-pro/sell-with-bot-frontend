// components/BillingCards.js
import React from 'react';
import styled from 'styled-components';
import { FaFilePdf } from 'react-icons/fa';
import Circles from '../../assets/SuperAdmin/billing/Circles.png'
import M1 from '../../assets/SuperAdmin/billing/M1.png'
import M2 from '../../assets/SuperAdmin/billing/M2.png'
import cardBG from '../../assets/SuperAdmin/billing/cardBG.png'
import MEdit from '../../assets/SuperAdmin/billing/MEdit.png'
import fileIcon from '../../assets/SuperAdmin/billing/fileIcon.png'

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(461px, 1fr));
  grid-gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
`;

const Card = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;

height: 241px;
padding: 30px;
border: 1px solid #FFFFFF29;
border-radius: 20px;
  background-image: url(${cardBG});
  background-repeat: no-repeat;
  background-position: top;
  background-size: 100% 100%;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const CardTop = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

const CardBottom = styled.div`
display: flex;
flex-direction: column;
gap: 20px;
`;

const CardNumber = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #FFFFFF;
`;

const CardInfo = styled.div`
  display: flex;
  gap: 30px;
`;

const CardInfoHeading = styled.div`
display: flex;
flex-direction: column;
gap: 5px;
`;

const CardInfoHeadingTop = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: #FFFFFF;
`;

const CardInfoHeadingBottom = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #FFFFFF;
`;

const PaymentMethods = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
gap: 15px;

height: 241px;
padding: 30px;
background: #FFFFFF;
box-shadow: 0px 5px 14px 0px #0000000D;
border-radius: 20px;

@media (max-width: 768px) {
    padding: 20px;
  }
`;

const PaymentMethodsTop = styled.div`
display: flex;
justify-content: space-between;
`;

const SectionTitle = styled.h3`
  font-size: 14px;
  font-weight: 700;
  color: #2D3748;
`;

const AddButton = styled.button`
  background: #2D3748;
  color: #FFFFFF;
  width: 135px;
  height: 35px;
  font-size: 10px;
  font-weight: 700;
  border-radius: 8px;
  cursor: pointer;
`;

const Method = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #E2E8F0;
  align-items: center;
  gap: 20px;
  height: 65px;
  border-radius: 8px;
  padding: 0 20px;
`;

const MethodRight = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 400;
  color: #A0AEC0;
`;

const Invoices = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  background: #FFFFFF;
  box-shadow: 0px 5px 14px 0px #0000000D;
  border-radius: 20px;
  padding: 30px;
  height: 241px;
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const InvoiceTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #2D3748;
`;

const ViewAll = styled.button`
  background: none;
  border: 1px solid #3182CE;
  width: 111px;
  height: 35px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: 700;
  color: #3182CE;
  cursor: pointer;
`;

const CardTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #FFFFFF;
`;

const InvoiceItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InvoiceInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const InvoiceInfoHeading = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: #2D3748;
`;

const InvoiceInfoSubHeading = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #A0AEC0;
  margin-right: 20px;
`;

const InvoiceInfoRight = styled.div`
  display: flex;
  align-items: center;
`;

const InvoiceInfoRightSubHeading = styled.p`
  font-size: 10px;
  font-weight: 700;
  color: #2D3748;
  margin-left: 3px;
`;


const BillingCards = () => {
  return (
    <Container>
      <Card>
        <CardTop>
        <CardTitle>Argon X Chakra</CardTitle>
        <img src={Circles} alt='icon' />
        </CardTop>
        <CardBottom>
        <CardNumber>7812 2139 0823 XXXX</CardNumber>
        <CardInfo>
          <CardInfoHeading>
            <CardInfoHeadingTop>VALID THRU</CardInfoHeadingTop>
            <CardInfoHeadingBottom>05/24</CardInfoHeadingBottom>
          </CardInfoHeading>
          <CardInfoHeading>
            <CardInfoHeadingTop>CVV</CardInfoHeadingTop>
            <CardInfoHeadingBottom>xyz</CardInfoHeadingBottom>
          </CardInfoHeading>
        </CardInfo>
        </CardBottom>
      </Card>

      <PaymentMethods>
        <PaymentMethodsTop>
        <SectionTitle>
          Payment Method
        </SectionTitle>
        <AddButton>ADD NEW CARD</AddButton>
        </PaymentMethodsTop>
        <Method>
            <MethodRight>
            <img src={M1} alt='icon' />
            7812 2139 0823 XXXX
            </MethodRight>
            <img src={MEdit} alt='icon' />
        </Method>
        <Method>
            <MethodRight>
            <img src={M2} alt='icon' />
            7812 2139 0823 XXXX
            </MethodRight>
            <img src={MEdit} alt='icon' />
        </Method>
      </PaymentMethods>

      <Invoices>
        <CardTop>
        <InvoiceTitle>
          Invoices
        </InvoiceTitle>
        <ViewAll>VIEW ALL</ViewAll>
        </CardTop>
        <InvoiceItem>
          <InvoiceInfo>
            <InvoiceInfoHeading>March, 01, 2020</InvoiceInfoHeading>
            <InvoiceInfoSubHeading>#MS-415646</InvoiceInfoSubHeading>
          </InvoiceInfo>
          <InvoiceInfoRight>
            <InvoiceInfoSubHeading>$180</InvoiceInfoSubHeading>
            <img src={fileIcon} alt='icon' />
            <InvoiceInfoRightSubHeading>PDF</InvoiceInfoRightSubHeading>
          </InvoiceInfoRight>
        </InvoiceItem>
        <InvoiceItem>
          <InvoiceInfo>
            <InvoiceInfoHeading>February, 10, 2021</InvoiceInfoHeading>
            <InvoiceInfoSubHeading>#RV-126749</InvoiceInfoSubHeading>
          </InvoiceInfo>
          <InvoiceInfoRight>
            <InvoiceInfoSubHeading>$250</InvoiceInfoSubHeading>
            <img src={fileIcon} alt='icon' />
            <InvoiceInfoRightSubHeading>PDF</InvoiceInfoRightSubHeading>
          </InvoiceInfoRight>
        </InvoiceItem>
        <InvoiceItem>
          <InvoiceInfo>
            <InvoiceInfoHeading>April, 05, 2020</InvoiceInfoHeading>
            <InvoiceInfoSubHeading>#FB-212562</InvoiceInfoSubHeading>
          </InvoiceInfo>
          <InvoiceInfoRight>
            <InvoiceInfoSubHeading>$560</InvoiceInfoSubHeading>
            <img src={fileIcon} alt='icon' />
            <InvoiceInfoRightSubHeading>PDF</InvoiceInfoRightSubHeading>
          </InvoiceInfoRight>
        </InvoiceItem>
      </Invoices>
    </Container>
  );
};

export default BillingCards;
