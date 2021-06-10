import {
  MenusProvider,
  useMenus,
  MenusActionTypes,
} from '../../providers/MenusProvider';
import { Button } from './MenusStyles';
import { IMenu } from '../../interface/IMenu';
import { Modal, ModalContent, ModalOpenButton } from '../Modal/Modal';
import { Form } from '../Form/Form';

export const Menus: React.FC<MenusProps> = ({ menus }) => (
  <MenusProvider>
    <nav>
      <ul role="menu">
        {menus.map((list) => (
          <li role="menuitem" key={list.id}>
            <Menu list={list} level={0} />
          </li>
        ))}
      </ul>
    </nav>
  </MenusProvider>
);

const Menu: React.FC<MenuProps> = ({ list, level }) => {
  const [{ activePath }, dispatch] = useMenus();

  const handleClick = (level: number, id: string) => {
    dispatch({ type: MenusActionTypes.Click, payload: { level, id } });
  };

  const isActive = activePath.includes(list.id);
  const hasChild = list.children.length > 0;

  if (hasChild) {
    return (
      <>
        <Button
          aria-haspopup="menu"
          onClick={() => handleClick(level, list.id)}
          isActive={isActive}
        >
          {list.title}
        </Button>
        {isActive ? <SubMenu list={list} level={level} /> : null}
      </>
    );
  }

  if (list.form) {
    return (
      <Modal>
        <ModalOpenButton>
          <Button
            type="button"
            aria-haspopup={hasChild ? 'menu' : 'dialog'}
            onClick={() => handleClick(level, list.id)}
            isActive={isActive}
          >
            {list.title}
          </Button>
        </ModalOpenButton>
        <ModalContent title={list.form.title} aria-label={list.form.title}>
          <Form form={list.form} />
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal>
      <ModalOpenButton>
        <Button
          type="button"
          aria-haspopup={hasChild ? 'menu' : 'dialog'}
          onClick={() => handleClick(level, list.id)}
          isActive={isActive}
        >
          {list.title}
        </Button>
      </ModalOpenButton>
      <ModalContent title={'Error'} aria-label={'error'}>
        <span>
          This hasn't been implemented yet. Please try another menu item
        </span>
      </ModalContent>
    </Modal>
  );
};

const SubMenu: React.FC<MenuProps> = ({ list, level }) => (
  <ul role="menu" aria-label={list.title}>
    {list.children.map((item) => (
      <li key={item.id} role="menuitem">
        <Menu list={item} level={level + 1} />
      </li>
    ))}
  </ul>
);

type MenusProps = {
  menus: IMenu[];
};

type MenuProps = {
  list: IMenu;
  level: number;
};
