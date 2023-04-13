import ImageGallery from 'react-image-gallery';
import { makeStyles } from '@material-ui/core/styles';


const img = (props) => {
  if ((!props || props.length === 0) ) return [];

  const image_array = []
  props.map((image) => {
    image_array.push(
      {
          original: image,
          thumbnail: image
      }
    )

  })
 return image_array;
}



const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/250/150/',
  },
];
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
	};

export default Gallery;