/* global kakao */
import {
  AddressPositionBox,
  TopWrap,
  PrevArrowImg,
  SearchAddressTitle,
  SearchAddressInput,
  SearchImgStyled,
  SearchBox,
  LocationImg,
  UserLocationDiv,
  LocationText,
  TipBox,
  TipTitle,
  TipStyled,
  TipList,
  TipEx,
  TipMark,
} from '../styles/AddressStyle';
import prevIcon from '../img/arrow_prev_address.png';
import SearchImg from '../img/search_white.png';
import location from '../img/location.png';
import nextIcon from '../img/arrow_next_white.png';
import { useNavigate, Link } from 'react-router-dom';
import { DaumPostcodeEmbed } from 'react-daum-postcode';
import { userLocation } from '../atoms/SigninAtom';
import { useRecoilState } from 'recoil';

const { kakao } = window;

const SearchAddress = () => {
  const [userAddress, setUserAddress] = useRecoilState(userLocation);
  const navigate = useNavigate();
  const goPrev = () => {
    navigate(-1);
  };
  const goMap = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserAddress({
        coordinateX: position.coords.latitude,
        coordinateY: position.coords.longitude,
      });
    });
    setTimeout(() => {
      navigate('/location');
    }, 500);
  };
  const handleComplete = (data) => {
    setUserAddress({
      ...userAddress,
      address: data.address,
    });
    geocoder.addressSearch(data.address, handleCoordinate);
    console.log(data.address);
  };
  var geocoder = new kakao.maps.services.Geocoder();

  var handleCoordinate = function (result, status) {
    if (status === kakao.maps.services.Status.OK) {
      setUserAddress({
        ...userAddress,
        coordinateX: result[0].road_address.x,
        coordinateY: result[0].road_address.y,
      });
    }
  };

  return (
    <div>
      <AddressPositionBox>
        <TopWrap>
          <PrevArrowImg src={prevIcon} alt="prevBtn" onClick={goPrev} />
          <SearchAddressTitle>주소검색</SearchAddressTitle>
          <SearchBox>
            <UserLocationDiv>
              <LocationImg src={location} alt="locationImg" />
              <LocationText onClick={goMap}>현재 위치로 설정하기</LocationText>
              <img src={nextIcon} alt="nextArrow" />
            </UserLocationDiv>
            <DaumPostcodeEmbed
              style={{ marginTop: '20px', height: '800px' }}
              onComplete={handleComplete}
            />
          </SearchBox>
        </TopWrap>
      </AddressPositionBox>
    </div>
  );
};

export default SearchAddress;
