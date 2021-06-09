import { Button } from './MenusStyles';
import { IMenu } from '../../interface/IMenu';

export const Menus = ({ menus }: MenusProps) => (
  <nav>
    <ul role="menu">
      {menus.map((list) => (
        <li role="menuitem" key={list.id}>
          <Menu list={list} />
        </li>
      ))}
    </ul>
  </nav>
);

const Menu = ({ list }: MenuProps) => {
  const hasChild = list.children.length > 0;
  return (
    <>
      <Button type="button" aria-haspopup={hasChild ? 'menu' : 'dialog'}>
        {list.title}
      </Button>
      {hasChild ? <SubMenu list={list} /> : null}
    </>
  );
};

const SubMenu = ({ list }: MenuProps) => (
  <ul role="menu" aria-label={list.title}>
    {list.children.map((item) => (
      <li key={item.id} role="menuitem">
        <Menu list={item} />
      </li>
    ))}
  </ul>
);

type MenusProps = {
  menus: IMenu[];
};

type MenuProps = {
  list: IMenu;
};
