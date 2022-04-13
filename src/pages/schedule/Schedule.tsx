import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import * as BsIcons from 'react-icons/bs';
import { fetchUser } from '../../redux/userSlice';
import { deleteRequisition } from '../../services/services';
import { ScheduleItem } from '../../components/ScheduleItem/ScheduleItem';
import TopBarPattern from '../../components/topBar/profile/TopBarProfile';
import {
  Main,
  RequestFromOthers,
  RequestsWrapper,
  UserRequest,
  Article,
} from './styles';

export function Schedule() {
  const currentUser = useSelector((state: any) => {
    return state.user;
  });
  const { mentoringListGiven, mentoringListReceived } = currentUser.user;
  const dispatch = useDispatch();

  const reload = async () => {
    await dispatch(fetchUser(currentUser.user.email));
  };

  return (
    <Main>
      <TopBarPattern />
      <RequestsWrapper>
        <UserRequest>
          <h2>Meus agendamentos</h2>
          {mentoringListReceived.map((item: any) => {
            return (
              <Article>
                <ScheduleItem
                  key={uuidv4()}
                  name={item.userName}
                  subject={item.subject}
                  urgency={item.urgency}
                />
                <BsIcons.BsTrash
                  size={40}
                  color="red"
                  onClick={async () => {
                    const flag = await deleteRequisition(
                      item.id,
                      item.userEmail
                    );
                    if (flag) reload();
                  }}
                />
              </Article>
            );
          })}
        </UserRequest>
        <RequestFromOthers>
          <h2>Solicitações</h2>
          {mentoringListGiven.map((item: any) => {
            return (
              <Article>
                <ScheduleItem
                  key={uuidv4()}
                  name={item.userName}
                  subject={item.subject}
                  urgency={item.urgency}
                />
                <BsIcons.BsTrash
                  size={40}
                  color="red"
                  onClick={async () => {
                    const flag = await deleteRequisition(
                      item.id,
                      item.requiredUserEmail
                    );
                    if (flag) reload();
                  }}
                />
              </Article>
            );
          })}
        </RequestFromOthers>
      </RequestsWrapper>
    </Main>
  );
}

export default Schedule;
