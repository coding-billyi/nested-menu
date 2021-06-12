import {
  MenusProvider,
  useMenus,
  MenusActionTypes,
} from '../../providers/MenusProvider';
import { Button, SubMenuUl } from './MenusStyles';
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
  const {
    state: { activePath },
    dispatch,
  } = useMenus();

  const handleClick = (level: number, id: string) => {
    dispatch({ type: MenusActionTypes.Click, payload: { level, id } });
  };

  const handleClose = () => {
    dispatch({ type: MenusActionTypes.Cancel });
  };

  const isActive = activePath.includes(list.id);
  const hasChild = list.children.length > 0;

  if (hasChild) {
    return (
      <>
        <Button
          aria-haspopup="menu"
          aria-expanded={isActive}
          aria-controls={list.id}
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
            aria-haspopup="dialog"
            aria-expanded={isActive}
            onClick={() => handleClick(level, list.id)}
            isActive={isActive}
          >
            {list.title}
          </Button>
        </ModalOpenButton>
        <ModalContent
          title={list.form.title}
          aria-label={list.form.title}
          onClose={handleClose}
        >
          <Form form={list.form} onClose={handleClose} />
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal>
      <ModalOpenButton>
        <Button
          aria-haspopup="dialog"
          aria-expanded={isActive}
          onClick={() => handleClick(level, list.id)}
          isActive={isActive}
        >
          {list.title}
        </Button>
      </ModalOpenButton>
      <ModalContent title={'Error'} aria-label={'error'} onClose={handleClose}>
        <div role="document">
          <p>This hasn't been implemented yet. Please try another menu item</p>
        </div>
      </ModalContent>
    </Modal>
  );
};

const SubMenu: React.FC<MenuProps> = ({ list, level }) => (
  <SubMenuUl
    role="menu"
    data-testid={`submenu-${list.title}`}
    aria-label={list.title}
    id={list.id}
  >
    {list.children.map((item) => (
      <li role="menuitem" key={item.id}>
        <Menu list={item} level={level + 1} />
      </li>
    ))}
  </SubMenuUl>
);

type MenusProps = {
  menus: IMenu[];
};

type MenuProps = {
  list: IMenu;
  level: number;
};
