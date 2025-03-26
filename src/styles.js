import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {flex: 1, padding: 16, backgroundColor: '#fff'},
  title: {fontSize: 24, fontWeight: 'bold', marginVertical: 10},
  input: {borderWidth: 1, padding: 8, marginVertical: 5, borderRadius: 5},
  category: {marginVertical: 10},
  categoryTitle: {fontSize: 18, fontWeight: 'bold'},
  timerItem: {padding: 10, borderBottomWidth: 1, borderColor: '#ccc'},
  timerControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  bulkActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginVertical: 5,
  },
  progressBar: {height: '100%', backgroundColor: '#4caf50', borderRadius: 5},
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});
