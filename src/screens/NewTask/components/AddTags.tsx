import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {COLORS} from '../../../constants/theme';
import {TAGS} from '../../../constants/data';
import Tag from '../../../components/Tag';
import {Button} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

const AddTags = ({setTagsInTask}: any) => {
  const [tags, setTags] = React.useState(
    TAGS.map((item: any) => ({...item, selected: false})),
  );
  const [tagsSelected, setTagsSelected] = React.useState<any>();
  const [tagsModal, showTagsModal] = React.useState(false);
  return (
    <View>
      {tagsSelected && tagsSelected.length !== 0 ? (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {tagsSelected.map((tag: any, index: number) => (
            <Tag
              key={index}
              tag={tag}
              onPress={() => {
                setTagsSelected([
                  ...tagsSelected.filter((t: any) => t.id !== tag.id),
                ]);
              }}
            />
          ))}
        </View>
      ) : (
        <TouchableOpacity
          onPress={() => showTagsModal(true)}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            backgroundColor: '#ccc4',
            borderWidth: 3,
            borderStyle: 'dashed',
            borderColor: '#ccce',
            borderRadius: 5,
          }}>
          <Text>Add Tags</Text>
        </TouchableOpacity>
      )}

      {/* Modal */}
      <Modal
        isVisible={tagsModal}
        style={{alignItems: 'center'}}
        backdropOpacity={0.5}>
        <View
          style={{
            width: '90%',
            height: '60%',
            backgroundColor: COLORS.background,
            borderRadius: 30,
          }}>
          <Text
            style={{
              fontWeight: '600',
              textAlign: 'center',
              fontSize: 20,
              marginVertical: 20,
            }}>
            Available Tags
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {tags.map((tag: any, index: number) => (
              <Tag
                key={index}
                tag={tag}
                selected={tag.selected}
                onPress={() => {
                  setTags(prev => {
                    let newData = [...prev];
                    newData[index] = {
                      ...newData[index],
                      selected: !newData[index].selected,
                    };
                    return newData;
                  });
                }}
              />
            ))}
          </View>

          <View style={{position: 'absolute', bottom: 25, right: 15}}>
            <Button
              onPress={() => {
                const filteredTags = [
                  ...tags.filter((tag: any) => tag.selected),
                ];
                setTagsSelected(filteredTags);
                showTagsModal(false);
                setTagsInTask(filteredTags);
              }}
              variant="subtle"
              size="sm">
              Done
            </Button>
          </View>
          <View style={{position: 'absolute', top: 10, right: 10}}>
            <TouchableOpacity
              onPress={() => showTagsModal(false)}
              style={{
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <FontAwesomeIcon size={24} icon={faTimes} color={COLORS.gray} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AddTags;

const styles = StyleSheet.create({});
