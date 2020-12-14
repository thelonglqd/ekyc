import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

const ProgressBar = () => {
  const classes = useStyles();
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((old) => {
        if (old === 100) return 0;
        const diff = Math.random() * 10;
        return Math.min(old + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <div className={classes.root}>
      <LinearProgress
        color="secondary"
        variant="determinate"
        value={progress}
      ></LinearProgress>
    </div>
  );
};

export default ProgressBar;
