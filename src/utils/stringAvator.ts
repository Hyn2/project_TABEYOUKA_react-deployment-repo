function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

/**
 * 이름을 받아서 아바타를 만들어주는 함수
 * @param name 이름
 * @returns AvatarProps { sx, children }
 */
export function stringAvatar(name: string) {
  const [firstName, lastName=''] = name.split(' ');

  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${firstName[0]}${lastName[0] ?? firstName[1] ?? ''}`,
  };
}
