import React, { useEffect, useState, useRef } from 'react';

const Icon = (props) => {
  const { name } = props;

  const ImportedIconRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const importIcon = async () => {
      try {
        ImportedIconRef.current = (
          await import(`../../../../public/icons/${name}.svg`)
        ).default;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name]);

  if (!loading && ImportedIconRef.current) {
    const { current: ImportedIcon } = ImportedIconRef;
    return <ImportedIcon {...props} />;
  }

  return null;
};

export default Icon;
