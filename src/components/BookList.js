import React, {Component} from 'react';
import {Text, View, Image} from 'react-native';
import styles from '../styles/book';
import {REACT_APP_API_URL} from '@env';

export default class BookList extends Component {
  render() {
    const book = this.props.data;
    const maxlimit = 200;
    return (
      <View style={styles.bookGroup}>
        <Image
          style={styles.bookImg}
          source={{uri: `${REACT_APP_API_URL}img/${book.image}`}}
        />
        <View style={{paddingLeft: 15, paddingRight: 15}}>
          <Text style={styles.titleSection}>{book.title}</Text>
          <Text>{book.author}</Text>
          <Text style={{paddingRight: 100}}>
            {book.description.length > maxlimit
              ? book.description.substring(0, maxlimit - 3) + '...'
              : book.description}
          </Text>
        </View>
      </View>
    );
  }
}
