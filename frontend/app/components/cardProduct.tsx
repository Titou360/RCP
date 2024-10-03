import Image from 'next/image';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Switch, Badge } from './MaterialUIWrapper';

export function CardProduct({
  isHorizontal,
  priceOption,
  titleCard,
  descriptionCard,
  titleBtn,
  srcPic,
}) {
  return (
    <Card className={`mt-6 ${isHorizontal ? 'w-full flex flex-col lg:flex-row' : 'w-96'}`}>
      <CardHeader
        color="blue-gray"
        className={`relative ${isHorizontal ? 'h-auto lg:w-1/4' : 'h-56'}`}
      >
        <Image
          src={srcPic}
          alt="card-image"
          layout="fill"
          className={`${isHorizontal ? 'object-cover lg:rounded-l-lg' : ''}`}
        />
        <div className="absolute right-2 top-1.5">
          <Badge color="green" placement="top-end">
            <Button>{priceOption}</Button>
          </Badge>
        </div>
      </CardHeader>
      <CardBody className="flex-grow flex flex-col justify-between">
        <Typography variant="h3" color="blue-gray" className="text-xl mb-2 w-full">
          {titleCard}
        </Typography>
        <Typography>{descriptionCard}</Typography>
        <CardFooter className="pt-0 flex flex-row justify-between">
          <Button size="sm">{titleBtn}</Button>
          <Switch color="green" />
        </CardFooter>
      </CardBody>
    </Card>
  );
}

