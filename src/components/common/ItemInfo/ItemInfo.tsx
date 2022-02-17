import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  StyledChartCard,
  StyledHeading,
  StyledInfoContainer,
  StyledProductImage,
  StyledWrapper,
  StyledParagraph,
  StyledTrackButton,
  StyledItemPrice,
  StyledPriceWrapper,
} from './styled';
import PriceChart from './PriceChart';
import { API_LINK } from '../constants';
import { RootState } from '../../../store/store';
import { useSelector } from 'react-redux';
import { Product, ProductPrice } from '../types';
import { Flex, Spinner } from '../../typography';
import StarRating from '../StarRating/StarRating';
import { useProductRating } from '../../../hooks/useProductRating';
import { COLOR_GREEN_100 } from '../constants/colors';
import { useFixedDescription } from '../../../hooks/useFixedDescription';

type ExtendedProductInfo = Product & ProductPrice;

const ItemInfo = () => {
  const { key } = useParams();
  const [currentProduct, setCurrentProduct] = useState<ExtendedProductInfo | null>(null);
  const [isTracked, setIsTracked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const trackedItems = useSelector((state: RootState) => state.tracking.tracked);
  const [ratingArr, rating] = useProductRating(currentProduct?.rating);
  const fixedDescription = useFixedDescription(currentProduct?.description);

  useEffect(() => {
    const URL = API_LINK + `product?key=${key}`;
    setIsLoading(true);
    fetch(URL)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCurrentProduct(data);
        if (currentProduct) {
          const itemId = currentProduct.id.toString();
          setIsTracked(trackedItems.includes(itemId));
        }
        setIsLoading(false);
      });
  }, [key, trackedItems]);

  if (isLoading) {
    return (
      <StyledInfoContainer>
        <Spinner size='50px' color={COLOR_GREEN_100} />;
      </StyledInfoContainer>
    );
  } else {
    return (
      <StyledInfoContainer justify='space-between'>
        <StyledProductImage
          bgImage={currentProduct ? currentProduct.image : null}
        ></StyledProductImage>
        <StyledWrapper>
          <StyledHeading>{currentProduct?.extended_name}</StyledHeading>
          <Flex justify='flex-start' gap='2rem'>
            <StarRating ratingArr={ratingArr} />
            <StyledParagraph>Product rating based on users: {rating}.0</StyledParagraph>
          </Flex>
          <StyledParagraph>Product description:</StyledParagraph>
          <StyledParagraph>{fixedDescription}</StyledParagraph>
          <StyledPriceWrapper justify='flex-start'>
            <StyledItemPrice>
              Price: from BYN {currentProduct?.price_min} to BYN {currentProduct?.prices.max.amount}
            </StyledItemPrice>
            <StyledTrackButton>Track?</StyledTrackButton>
          </StyledPriceWrapper>
        </StyledWrapper>
      </StyledInfoContainer>
    );
  }
};

export default ItemInfo;