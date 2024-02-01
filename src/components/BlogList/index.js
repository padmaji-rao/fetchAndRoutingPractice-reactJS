import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import BlogItem from '../BlogItem'

class BlogList extends Component {
  state = {
    isLoading: true,
    blogsData: [],
  }

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const formattedData = data.map(each => ({
      id: each.id,
      avatarUrl: each.avatar_url,
      author: each.author,
      imageUrl: each.image_url,
      title: each.title,
      topic: each.topic,
    }))
    this.setState({isLoading: false, blogsData: formattedData})
  }

  render() {
    const {isLoading, blogsData} = this.state
    console.log(isLoading, blogsData)

    return (
      <div className="blogs-list-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bfff" height={50} width={50} />
          </div>
        ) : (
          blogsData.map(each => <BlogItem blogData={each} key={each.id} />)
        )}
      </div>
    )
  }
}

export default BlogList
