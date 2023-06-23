import {
  Button,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material"
import { ellipsis, formatSpeedMiB, roundMiB } from "../utils"
import type { RPCResult } from "../types"

type Props = {
  downloads: RPCResult[]
  abortFunction: Function
}

export function DownloadsListView({ downloads, abortFunction }: Props) {
  return (
    <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} pt={2}>
      <Grid item xs={12}>
        <TableContainer component={Paper} sx={{ minHeight: '80vh' }} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={500} fontSize={15}>Title</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={500} fontSize={15}>Progress</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={500} fontSize={15}>Speed</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={500} fontSize={15}>Size</Typography>
                </TableCell>
                <TableCell>
                  <Typography fontWeight={500} fontSize={15}>Actions</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                downloads.map(download => (
                  <TableRow key={download.id}>
                    <TableCell>{ellipsis(download.info.title, 80)}</TableCell>
                    <TableCell>
                      <LinearProgress
                        value={
                          download.progress.percentage === '-1' ? 100 :
                            Number(download.progress.percentage.replace('%', ''))
                        }
                        variant="determinate"
                        color={download.progress.percentage === '-1' ? 'success' : 'primary'}
                      />
                    </TableCell>
                    <TableCell>{formatSpeedMiB(download.progress.speed)}</TableCell>
                    <TableCell>{roundMiB(download.info.filesize_approx ?? 0)}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={() => abortFunction(download.id)}
                      >
                        {download.progress.percentage === '-1' ? 'Remove' : 'Stop'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  )
}