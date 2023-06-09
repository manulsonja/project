  import ImageGallery from 'react-image-gallery';
  import { makeStyles } from '@material-ui/core/styles';

  const img = (props) => {
  if ((!props || props.length === 0) ) return [];

  const image_array = []
  props.map((image) => {
    console.log(image.image.ratios['16/9'].sources['image/jpeg']['1200'])
    image_array.push(
      {
          original: process.env.REACT_APP_API_URL+image.image.ratios['16/9'].sources['image/jpeg']['1200'],
          thumbnail: process.env.REACT_APP_API_URL+image.image.ratios['16/9'].sources['image/jpeg']['200']
      }
    )

  })
  return image_array;
  }

  const useStyles = makeStyles((theme) => ({

  gallerybox: {
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
  },
  }));

  function Gallery(props) {
  const classes = useStyles();
    return (
            <div className={classes.gallerybox}>  
              <ImageGallery items={img(props.props)} />
        </div>
    );
  }

  export default Gallery;