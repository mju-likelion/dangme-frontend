import { Routes, Route, useNavigate } from 'react-router-dom';
import ButtomNav from '../ButtomNav';
import {
  HomeReservTitleBox,
  HomeReservInfoBtn,
  HomeReservBox,
  HomeReservTitle,
  HomeReservInfoBox,
  HomeReservBtn,
  UserPositionBox,
  UserPositionIcon,
  UserPositionSetBtn,
  UserPositionText,
  PetShopListBox,
  PetShopListTitle,
  PetShopListSubTitle,
  PetShopInfoBox,
  PetShopInfoImg,
  PetShopInfoName,
  PetShopInfoAddress,
  PetShopInfoClosed,
  HomeReservInfoImg,
  HomeReservInfoShop,
  HomeReservInfoName,
  HomeReservInfoDate,
  HomeReservInfoAny,
  HomeReservInfoListWrap,
  PetShopInfoListWrap,
  HomeFlexBox,
  HomeMiddleBox,
} from '../styles/HomeStyle';
import positionIcon from '../img/positionIcon.png';
import positionSet from '../img/positionSet.png';
import nextIcon from '../img/arrow_next_home.png';
import defaultPetImg from '../img/defaultPetImg.png';
import { useEffect, useState } from 'react';
import { userLocation } from '../atoms/SigninAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import axios from 'axios';
import { shopList } from '../atoms/SigninAtom';
import { petList } from '../atoms/ReservationAtom';
import { userInfo } from './../atoms/SigninAtom';

const Home = () => {
  const navigate = useNavigate();
  const [userlocation] = useRecoilState(userLocation);
  const [shoplist, setShopList] = useRecoilState(shopList);
  const [petlist, setpetlist] = useRecoilState(petList);

  useEffect(() => {
    const fetchPetShops = async () => {
      try {
        const response = await axios.get('api/coordinate');
        setShopList(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    const fetchPetInfo = async () => {
      try {
        const response = await axios.get('/api/pet/main');
        setpetlist(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPetShops();
    fetchPetInfo();
  }, []);

  const goToReservHistory = () => {
    navigate('/reservationHistory');
  };
  const goSearchAddress = () => {
    navigate('/searchAddress');
  };

  const goToReservation = () => {
    navigate('/reservation');
  };

  const goToShopInfo = () => {
    navigate('/ShopInfo');
  };

  return (
    <>
      <UserPositionBox>
        <UserPositionIcon src={positionIcon} alt='position_icon' />
        <UserPositionText onClick={goSearchAddress}>
          {userlocation.address === undefined
            ? userlocation[0].address
            : userlocation.address}
        </UserPositionText>
        <UserPositionSetBtn src={positionSet} />
      </UserPositionBox>
      <HomeMiddleBox>
        <HomeReservBox>
          <HomeReservTitleBox>
            <HomeReservTitle>미용 예약 현황</HomeReservTitle>
            <HomeReservInfoBtn
              src={nextIcon}
              alt='goReservHistory'
              onClick={goToReservHistory}
            />
          </HomeReservTitleBox>
          <HomeReservInfoListWrap>
            {petlist.map((pet, index) => (
              <HomeReservInfoBox key={index}>
                {pet.petImg === '' ? (
                  <HomeReservInfoImg src={defaultPetImg} />
                ) : (
                  <HomeReservInfoImg src={pet.petImg} />
                )}
                {pet.shopName === null ? (
                  <>
                    <HomeReservInfoName>{pet.petName}</HomeReservInfoName>
                    <HomeReservInfoAny>예약 내역이 없습니다.</HomeReservInfoAny>
                  </>
                ) : (
                  <>
                    <HomeReservInfoName style={{ color: '#FFA724' }}>
                      {pet.petName}
                    </HomeReservInfoName>
                    <HomeReservInfoShop>{pet.shopName}</HomeReservInfoShop>
                  </>
                )}
              </HomeReservInfoBox>
            ))}
          </HomeReservInfoListWrap>
        </HomeReservBox>
        <HomeReservBtn onClick={goToReservation}>미용 예약하기</HomeReservBtn>
        <PetShopListBox>
          <PetShopListTitle>우리동네 애견 미용샵</PetShopListTitle>
          <PetShopInfoListWrap>
            {shoplist.map((petShop, index) => (
              <PetShopInfoBox onClick={goToShopInfo} key={index}>
                <PetShopInfoImg src={petShop.shopImg} alt='petshop' />
                <PetShopInfoName>{petShop.shopName}</PetShopInfoName>
                <PetShopInfoAddress>{petShop.address}</PetShopInfoAddress>
                <PetShopInfoClosed>{petShop.workHoly}</PetShopInfoClosed>
              </PetShopInfoBox>
            ))}
          </PetShopInfoListWrap>
        </PetShopListBox>
      </HomeMiddleBox>
      <Routes>
        <Route path='/*' element={<ButtomNav />} />
      </Routes>
    </>
  );
};

export default Home;
