import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 220,
        boxShadow: 'none'
    },
    media: {
      height: 80,
      paddingTop: '56.25%', // 16:9
    },
    content: {
        alignItems: 'center',
        color: '#808080',
        display: 'flex',
        fontSize: 14,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    title: {
        marginBottom: 10,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        width: '100%',
        textOverflow: 'ellipsis',
    }
  }));

type CardProps = {
    title?: string;
    imageUrl?: string;
    price?: string;
};

const CardComponent = (props: CardProps) => {
    const { title, imageUrl, price} = props;
    const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title={title}
      />
      <CardContent className={classes.content}>
        <div className={classes.title}>
            {title}
        </div>
        <div>
            <strong>{price}</strong>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardComponent;