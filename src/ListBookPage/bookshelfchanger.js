import React from 'react';
import * as constant from '../constant';

class BookShelfChanger extends React.Component {
    handleOptionChange = (event) => {
        const { value } = event.target;
        this.props.updateBookShelf(this.props.book, value)
    }

    render() {
        const { shelf } = this.props;
        return(
            <div className="book-shelf-changer">
                <select onChange={this.handleOptionChange} value={shelf ? shelf : 'none'}>
                    <option value="move" disabled>Move to...</option>
                    {
                        constant.BOOK_SELF_CHANGER_LIST.map((bookShelf, index) => (
                            <option
                                key={index}
                                value={bookShelf.value}
                            >
                                {bookShelf.name}
                            </option>
                        ))
                    }
                </select>
            </div>
        )
    }
}

export default BookShelfChanger;