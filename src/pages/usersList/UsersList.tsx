import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import { Dropdown } from '../../components/Dropdown';
import { TopBarPattern } from '../pattern';
import { MentorCard } from '../../components/MentorCard';
import {
  Filter,
  Mentors,
  Pages,
  Button,
  NumberPage,
  Select,
  Section,
} from './styles';
import { getUsers } from '../../services/services';
import { SkillFilter } from '../../components/SkillFilter';

function UsersList() {
  // const levels = ['Trainee', 'Júnior', 'Pleno', 'Sênior'];
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [sort, setSort] = useState('');
  const [size, setSize] = useState('6');
  const [sortByName, setSortByName] = useState('');
  const [selectedSkillsToFilter, setSelectedSkillsToFilter] = useState([
    { area: '', technologie: '' },
    { area: '', technologie: '' },
  ]);
  const [dataArr, setDataArr] = useState<any[]>([]);

  const [showFilterModal, setShowFilterModal] = useState(false);

  useEffect(() => {
    async function get() {
      const { data }: any = await getUsers(
        `/profiles/findall?page=${page}&size=${size}&sort=${sort}`
      );
      if (data) {
        setDataArr(data.content);
        setTotalPages(data.totalPages);
      }
    }
    get();
  }, [page, sort, size]);

  useEffect(() => {
    async function getBySkills() {
      if (
        selectedSkillsToFilter !==
        [
          { area: '', technologie: '' },
          { area: '', technologie: '' },
        ]
      ) {
        const { data }: any = await getUsers(
          `profiles/findbymultipleskills?firstSkill=${selectedSkillsToFilter[0].technologie}&secondSkill=${selectedSkillsToFilter[1].technologie}&page=${page}&size=${size}&sort=${sort}`
        );
        if (data) {
          setDataArr(data.content);
          setTotalPages(data.totalPages);
        }
      }
    }
    getBySkills();
  }, [selectedSkillsToFilter]);

  useEffect(() => {
    async function getByName() {
      if (sortByName !== '') {
        const { data }: any = await getUsers(
          `/profiles/findbyname?name=${sortByName}`
        );
        if (data) {
          setDataArr(data.content);
          setTotalPages(data.totalPages);
        }
      }
    }
    getByName();
  }, [sortByName]);

  const getCards = () => {
    return dataArr.map((user) => {
      return (
        <MentorCard
          key={uuidv4()}
          name={user.userName}
          occupation={user.professionList[0].occupation}
          tags={user.expertiseList}
          bioDescription={user.bio}
          email={user.email}
        />
      );
    });
  };

  const getOptions = () => {
    const values = [6, 12, 18];
    return values.map((item) => {
      return (
        <option key={item} value={item}>
          {item}
        </option>
      );
    });
  };

  const getPages = () => {
    const arr: any[] = [];
    for (let i = 0; i < totalPages; i += 1) {
      arr.push(
        <Button
          key={uuidv4()}
          onClick={() => {
            setSortByName('');
            setSort('');
            setPage(i);
          }}
        >
          {i + 1}
        </Button>
      );
    }
    return arr;
  };

  function handleSkillFilter() {
    setShowFilterModal((prev) => {
      return !prev;
    });
  }

  return (
    <main>
      <SkillFilter
        showFilterModal={showFilterModal}
        setShowFilterModal={setShowFilterModal}
        setSelectedSkillsToFilter={setSelectedSkillsToFilter}
      />
      <TopBarPattern flag setSortByName={setSortByName} />

      <Filter>
        <button type="button" onClick={handleSkillFilter}>
          Filtrar por habilidades
        </button>
      </Filter>

      <Mentors>{getCards()}</Mentors>

      <Section>
        <NumberPage>
          <Select
            onChange={(e) => {
              setSortByName('');
              setSize(e.target.value);
              setSort('');
            }}
          >
            {getOptions()}
          </Select>
        </NumberPage>
        <Pages>{getPages()}</Pages>
      </Section>
    </main>
  );
}

export default UsersList;
